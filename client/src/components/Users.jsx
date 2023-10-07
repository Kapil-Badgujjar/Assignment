import React, { useState, useEffect } from "react";
import styles from './styles.module.css';
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice/userSlice";
import { useNavigate } from "react-router-dom";
import User from "./User";
import axios from "axios";
export default function Users() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (!user.username) {
      navigate("/");
    }
    getUsers();
  }, [user]);
  async function getUsers() {
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_ADDRESS + "/users/get-all-users",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("a_token"),
          },
        }
      );

      if (response.status === 200) setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div >
      {users.map((user) => (
        <div className={styles.user} key={user.email}>
          <User user={user} />
        </div>
      ))}
    </div>
  );
}
