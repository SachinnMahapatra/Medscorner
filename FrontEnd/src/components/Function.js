
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react'

const [username, setUsername] = useState("")
const [isLoggedIn, setLoggedIn] = useState(false)
const [cartItems, setCartItems] = useState([]);

const checkLoggedInUser = async () => {
    const navigate = useNavigate()
    try {
        const token = localStorage.getItem("accessToken");
        if (token) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            console.log("logged in")
            const response = await axios.get("http://127.0.0.1:8000/api/users/details/", config)

            setLoggedIn(true)
            setUsername(response.data.username)
        }
        else {
            setLoggedIn(false);
            setUsername("");
            setTimeout(() => {
                navigate("/Profile", { replace: true })
            }, 2000);

        }
    }
    catch (error) {
        setLoggedIn(false);
        setUsername("");
        setTimeout(() => {
            navigate("/Profile", { replace: true })
        }, 2000);
    }
};

const fetchCart = async () => {
    try {
        const token = localStorage.getItem("accessToken");
        if (token) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            };
            const response = await axios.get("http://127.0.0.1:8000/api/cart", config)
            setCartItems(response.data)
        }
    } catch (error) {
        console.log(error.message)
    }
}


export const func = () =>{
    const [nam , setName]=useState("Sourav");
    setName("priya")
    console.log(nam)
    return "okay"
}

// export default fetchCart

