import React, { useState, useEffect } from "react";
import styles from './styles.module.css';
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Profile() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [profile, setProfile] = useState(undefined);
  useEffect(() => {
    if (!user?.username) {
      navigate("/");
    }
    getProfile();
  }, [user]);
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
      if (response.status === 200) setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={styles.profile}>
        <p>Username: <span>{profile?.username}</span></p>
        <p>Email: <span>{profile?.email}</span></p>
        <p>Password: <span>{profile?.password}</span></p>
    </div>
  );
}
