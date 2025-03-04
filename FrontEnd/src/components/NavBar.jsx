import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import axios from 'axios'

const NavBar = () => {
  const [isLoggedIn , setLoggedIn] = useState(false)
  const [username,setUsername] = useState()

  const checkLoggedInUser = async () => {
    // const navigate = useNavigate()
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const config = {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        };
        const response = await axios.get("http://127.0.0.1:8000/api/users/details/", config)
        // console.log("logged in")

        setLoggedIn(true)
        setUsername(response.data.username)
        // console.log(response.data)
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
useEffect(()=>{
  checkLoggedInUser()
},[])

  return <>
    <nav className='flex justify-between p-2'>
      <div className="left ">
        <svg width="55" height="21" viewBox="0 0 55 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_2_24927)">
            <path d="M12.9603 0C10.828 0 8.78311 0.847035 7.27538 2.35477L2.35477 7.27538C0.847035 8.78311 0 10.828 0 12.9603C0 17.4005 3.5995 21 8.03971 21C10.172 21 12.2169 20.1529 13.7246 18.6452L17.1282 15.2416C17.1282 15.2415 17.1283 15.2417 17.1282 15.2416L27.0452 5.32462C27.7653 4.60454 28.7419 4.2 29.7603 4.2C31.4652 4.2 32.9106 5.31119 33.4118 6.84885L36.5415 3.71907C35.1138 1.48284 32.6102 0 29.7603 0C27.628 0 25.5831 0.847035 24.0754 2.35477L10.7548 15.6754C10.0347 16.3955 9.05807 16.8 8.03971 16.8C5.91909 16.8 4.2 15.0809 4.2 12.9603C4.2 11.9419 4.60454 10.9653 5.32462 10.2452L10.2452 5.32462C10.9653 4.60454 11.9419 4.2 12.9603 4.2C14.6653 4.2 16.1106 5.31124 16.6118 6.84895L19.7416 3.71915C18.3138 1.48288 15.8103 0 12.9603 0Z" fill="black" />
            <path d="M27.5566 15.6754C26.8365 16.3955 25.8599 16.8 24.8415 16.8C23.1368 16.8 21.6915 15.6891 21.1902 14.1517L18.0605 17.2814C19.4884 19.5173 21.9918 21 24.8415 21C26.9738 21 29.0187 20.1529 30.5264 18.6452L43.847 5.32462C44.5671 4.60454 45.5437 4.2 46.5621 4.2C48.6827 4.2 50.4018 5.91909 50.4018 8.03971C50.4018 9.05807 49.9973 10.0347 49.2772 10.7548L44.3566 15.6754C43.6365 16.3955 42.6599 16.8 41.6415 16.8C39.9367 16.8 38.4913 15.6889 37.9901 14.1513L34.8604 17.2811C36.2882 19.5173 38.7917 21 41.6415 21C43.7738 21 45.8187 20.1529 47.3264 18.6452L52.247 13.7246C53.7547 12.2169 54.6018 10.172 54.6018 8.03971C54.6018 3.5995 51.0023 0 46.5621 0C44.4298 0 42.3849 0.847035 40.8772 2.35477L27.5566 15.6754Z" fill="black" />
          </g>
          <defs>
            <clipPath id="clip0_2_24927">
              <rect width="54.6" height="21" fill="black" />
            </clipPath>
          </defs>
        </svg>


      </div>


      <div className="middle flex gap-1 sm:gap-5 lg:gap-7 justify-center">
        <span> <NavLink to="/">Home</NavLink> </span>
        {/* <span>Categories
          <svg className='inline' width="10" height="6" viewBox="0 0 10 6" fill="black" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.59961 1L4.59961 5L8.59961 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

        </span> */}
        <span> <NavLink to="/Contact">Contact Us</NavLink> </span>
        <span><NavLink to="/About">About us</NavLink></span>
      </div>


      <div className="right ">
      {isLoggedIn && <span>Hey, {username} </span>}

        <NavLink to="/Profile">
          <svg className='inline mr-1 sm:mr-5 lg:mr' width="21" height="20" viewBox="0 0 21 20" fill="black" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5996 10C9.22461 10 8.04753 9.51042 7.06836 8.53125C6.08919 7.55208 5.59961 6.375 5.59961 5C5.59961 3.625 6.08919 2.44792 7.06836 1.46875C8.04753 0.489584 9.22461 0 10.5996 0C11.9746 0 13.1517 0.489584 14.1309 1.46875C15.11 2.44792 15.5996 3.625 15.5996 5C15.5996 6.375 15.11 7.55208 14.1309 8.53125C13.1517 9.51042 11.9746 10 10.5996 10ZM0.599609 20V16.5C0.599609 15.7917 0.78211 15.1404 1.14711 14.5463C1.51211 13.9521 1.99628 13.4992 2.59961 13.1875C3.89128 12.5417 5.20378 12.0571 6.53711 11.7338C7.87044 11.4104 9.22461 11.2492 10.5996 11.25C11.9746 11.25 13.3288 11.4117 14.6621 11.735C15.9954 12.0583 17.3079 12.5425 18.5996 13.1875C19.2038 13.5 19.6884 13.9533 20.0534 14.5475C20.4184 15.1417 20.6004 15.7925 20.5996 16.5V20H0.599609Z" fill="black" />
          </svg>

          {/* <img src="./src/assets/profile.svg" alt="" className='inline mr-1 sm:mr-5 lg:mr'/>  */}
        </NavLink>
        <NavLink to="/Cart">
          <svg className='inline' width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.60455 0C12.2845 0 14.4878 2.10591 14.5996 4.77432H14.5735C14.5766 4.85189 14.5617 4.92913 14.5299 5H14.6861C15.9031 5 17.1775 5.84351 17.6884 7.8798L17.744 8.12007L18.5129 14.3147C19.0662 18.2657 16.9046 19.9273 13.9558 19.9977L13.7581 20H5.46814C2.47139 20 0.162154 18.908 0.66989 14.5836L0.704514 14.3147L1.48225 8.12007C1.86575 5.92719 3.15322 5.06225 4.39373 5.00326L4.53132 5H4.6095C4.59631 4.92535 4.59631 4.84898 4.6095 4.77432C4.72133 2.10591 6.9246 0 9.60455 0ZM6.69661 8.32929C6.2085 8.32929 5.81282 8.73655 5.81282 9.23893C5.81282 9.74131 6.2085 10.1486 6.69661 10.1486C7.18471 10.1486 7.5804 9.74131 7.5804 9.23893L7.57351 9.12483C7.51897 8.67631 7.14716 8.32929 6.69661 8.32929ZM12.4854 8.32929C11.9973 8.32929 11.6016 8.73655 11.6016 9.23893C11.6016 9.74131 11.9973 10.1486 12.4854 10.1486C12.9735 10.1486 13.3692 9.74131 13.3692 9.23893C13.3692 8.73655 12.9735 8.32929 12.4854 8.32929ZM9.56536 1.30238C7.64125 1.30238 6.08145 2.85682 6.08145 4.77432C6.09463 4.84898 6.09463 4.92535 6.08145 5H13.0928C13.065 4.92794 13.0502 4.85153 13.0493 4.77432C13.0493 2.85682 11.4895 1.30238 9.56536 1.30238Z" fill="black" />
          </svg>

          {/* <img src="./src/assets/bag.svg" alt="" className='inline'/> */}
        </NavLink>
      </div>

    </nav>
  </>
}

export default NavBar