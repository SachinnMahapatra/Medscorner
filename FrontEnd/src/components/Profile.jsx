import React, { useEffect, useState } from 'react'
import Login from './Login'

const Profile = () => {
  const [login,setLogin]=useState(false)

  useEffect(() => {
    if(!localStorage.getItem("medsCornerLogin")){
      setLogin(true)
    }
  
    
  }, [])
  
    return <>
    {login?<Login/>:"Profile"}

  </>

}

export default Profile