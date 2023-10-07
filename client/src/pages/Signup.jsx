import React, { useState } from 'react'
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  async function handleSubmit(){
    try{
      const response = await axios.post(import.meta.env.VITE_SERVER_ADDRESS + '/users/signup',{
        username,
        email,
        password
      },{
        withCredentials: true,
      });
      if(response.status === 200 ){
        navigate('/');
      }
    } catch(e){
      console.log(e);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.left}>

        </div>
        <div className={styles.right}>
            <input className={styles.inputBox} type='text' placeholder='Username' value={username} onChange={e=>setUsername(e.target.value)} />
            <input className={styles.inputBox} type='text' placeholder='Enter your email' value={email} onChange={e=>setEmail(e.target.value)} />
            <input className={styles.inputBox} type='password' placeholder='Enter your password' value={password} onChange={e=>setPassword(e.target.value)} />
            <button className={styles.btn} onClick={handleSubmit}>Signup</button>
            <p>Already have an account! <span className={styles.link} onClick={()=>{navigate('/')}}> Login</span></p>
        </div>
      </div>
    </div>
  )
}
