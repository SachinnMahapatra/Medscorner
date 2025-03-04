import React, { useEffect, useState } from 'react'
import Login from './Login'
import axios from "axios";
import NavBar from './NavBar';
import ProfilePage from './ProfilePage';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [details,setDetails] = useState({})

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        // console.log(token)
        if (token) {
          const config = {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          };
          console.log("logged in")
          const response = await axios.get("http://127.0.0.1:8000/api/users/details/", config)
          setLoggedIn(true)
          setDetails(response.data)
          console.log(response.data)
          setUsername(response.data.username)
        }
        else {
          setLoggedIn(false);
          setUsername("");
        }
      }
      catch (error) {
        setLoggedIn(false);
        setUsername("");
      }
    };
    checkLoggedInUser()
  }, [])

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (accessToken && refreshToken) {
        const config = {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        };
        const res = await axios.post("http://127.0.0.1:8000/api/users/logout", { "refresh": refreshToken }, config)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setLoggedIn(false);
        setUsername("");
        console.log("Log out successful!")
        setTimeout(() => {
          // window.location.reload(false)
          navigate("/", { replace: true })
        }, 1000);
      }
    }
    catch (error) {
      console.error("Failed to logout", error.response?.data || error.message)
    }
  }

  return <>


    {
      isLoggedIn ? <ProfilePage details={details}/>
      :
      <Login />
    }
    

  </>

}

export default Profile