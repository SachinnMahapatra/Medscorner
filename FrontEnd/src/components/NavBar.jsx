import React from 'react'
import {NavLink} from "react-router-dom"

const NavBar = () => {
  return <>
    <nav className='flex justify-between'>
    <div className="left ">
      <img src="./src/assets/logo.svg" alt="logo" />

</div>


    <div className="middle flex gap-1 sm:gap-5 lg:gap-7 justify-center">
      <span> <NavLink to="/">Home</NavLink> </span>
        <span>Categories <img src="./src/assets/dropDown.svg" className='inline'/></span>
        <span> <NavLink to="/Contact">Contact Us</NavLink> </span>
        <span><NavLink to="/About">About us</NavLink></span>
    </div>


    <div className="right ">
      <NavLink to="/Profile"><img src="./src/assets/profile.svg" alt="" className='inline mr-1 sm:mr-5 lg:mr'/> </NavLink>
      <NavLink to="/Cart">
      <img src="./src/assets/bag.svg" alt="" className='inline'/>
      </NavLink>
    </div>

  </nav>
  </>
}

export default NavBar