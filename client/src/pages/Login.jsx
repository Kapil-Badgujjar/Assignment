import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles.module.css'
import { selectUser, setUser } from '../features/userSlice/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');

    const user = useSelector(selectUser);

    useEffect(() => {
      const token = localStorage.getItem('a_token');
      if(token){
        getProfile();
      }
    },[]);

    useEffect(()=>{
        if(user.username) navigate('dashboard');
    },[user])

    async function getProfile() {
      try {
        const response = await axios.get(
          import.meta.env.VITE_SERVER_ADDRESS + "/users/get-user-details",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("a_token"),
            },
          }
        );
        if (response.status === 200) dispatch(setUser({ email: response.data.email, username: response.data.username}));
      } catch (error) {
        console.log(error);
      }
    }

    async function handleSubmit(){
        try {
            const response = await axios.post(import.meta.env.VITE_SERVER_ADDRESS + '/users/login', { email, password }, { withCredentials: true});
            console.log(response);
            if(response.status === 200){
              localStorage.setItem('a_token', response.data.token);
                dispatch(setUser({email: response.data.email, username: response.data.username}));
            }
        } catch(err){
            console.log(err);
        }
    }
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.left}>

        </div>
        <div className={styles.right}>
            <input className={styles.inputBox} type='text' placeholder='Enter your email' value={email} onChange={e=>setEmail(e.target.value)} />
            <input className={styles.inputBox} type='password' placeholder='Enter your password' value={password} onChange={e=>setPassword(e.target.value)} />
            <button className={styles.btn} onClick={handleSubmit}>Login</button>
            <p>Don't have an account! <span className={styles.link} onClick={()=>navigate('/signup')}> Register now</span></p>
        </div>
      </div>
    </div>
  )
}
