import React, { useState } from 'react'
import styles from './styles.module.css';
import Users from '../components/Users';
import Profile from '../components/Profile';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/userSlice/userSlice';
export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(true);
  function logoutFun(){
    localStorage.removeItem('a_token');
    dispatch(logout());
    navigate('/');
  }
  return (
    <div className={styles.container}>
        <div className={styles.dashboardContainer}>
          <div className={styles.logoutDiv}>
            <button onClick={logoutFun}>Logout</button>
          </div>
          <div className={styles.navbar}>
              <div className={styles.navBtn} onClick={e=>setFlag(true)}>Get profile details</div>
              <div className={styles.navBtn} onClick={e=>setFlag(false)}>Get all users details</div>
          </div>
          <div className={styles.page}>
            {flag ? <Profile /> : <Users />}
          </div>
        </div>
    </div>
  )
}
