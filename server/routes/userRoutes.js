require('dotenv/config');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authenticateUser');
const { addUser, findUser, getUser, getAllUsers } = require('../services/userServices');

router.post('/signup', async (req, res)=>{
    if(!req.body.username) return res.status(400).send({ message: 'Please enter a username'});
    if(!req.body.email) return res.status(400).send({ message: 'Please enter a email'});
    if(!req.body.password) return res.status(400).send({ message: 'Please enter a password'});
    try{
        await addUser(req.body.username, req.body.email, req.body.password)
        res.status(200).send({status: 'Successed', message: 'Signup successful!'});
    } catch(err){
        console.log(err);
        res.status(500).send({status: 'Failed!', message: err.message});
    }
});

router.post('/login', async (req, res)=>{
    if(!req.body.email || !req.body.password) return res.status(400).send({message: 'Please enter username and password!'});
    try{
        const response = await findUser(req.body.email, req.body.password);
        const token = jwt.sign({ email: response.email, username: response.username},process.env.SECRET_KEY);
        res.status(200).send({token, message: 'Login successful!', username: response.username, email: response.email});
    } catch(error){
        console.log(error);
        res.status(404).send({message: 'User not found!'});
    }
});

router.get('/get-user-details', authenticateUser, async (req, res) => {
    try{
        const response = await getUser(req.user.email);
        res.status(200).send(response);
    } catch(error){
        console.log(error);
        res.status(500).send({message: 'Internal server error!'});
    }
});

router.get('/get-all-users', authenticateUser, async (req, res) => {
    try{
        const response = await getAllUsers();
        res.status(200).send(response);
    } catch(error){
        console.log(error);
        res.status(500).send({message: 'Internal server error!'});
    }
});

module.exports = router;