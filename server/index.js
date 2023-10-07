require('dotenv/config');
const express = require('express');
const cors = require('cors');
const server = express();
const PORT = 8223;
const user = require('./routes/userRoutes');
const connectToDatabase = require('./utils/databaseConnection');
const allowedAddresses = process.env.CLIENT_ADDRESS;
server.use(cors({
    origin: (origin, callback)=>{
        if(allowedAddresses.includes(origin) || !origin){
            return callback(null, true);
        } else {
            return callback(new Error('Address not allowed!'));
        }
    },
    credentials: true,
}))
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/users', user);

server.get('/', (req, res) => {
    res.status(200).send({ message: 'Server is active'});
});

connectToDatabase();
server.listen(PORT, err => err ? console.log('Error occurred!') : console.log(`Server listening on port ${PORT}`));