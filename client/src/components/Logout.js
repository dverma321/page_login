import React, {useEffect, useContext} from 'react'
import {useNavigate}  from 'react-router-dom'
import { userContext } from '../App'

const Logout = () => {
    
  const {state, dispatch} = useContext(userContext);

    const navigation = useNavigate();

    // using promises

    useEffect(()=> {
    const baseUrl = "https://logindatabase-j1ud.onrender.com"; //backend url
        
        fetch(`${baseUrl}/logout`, {
            method:"GET",
            headers: {
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res) => {
           dispatch({type:"USER", payload:false})

            navigation("/", {replace: true});
            
            if(!res.status === 2000)
            {
                const error = new Error(res.error);
                throw error;
            }
        })

        .catch((err) => {
            console.log(err)
        })
    })


  return (
    <div>Logout successfully now redirecting to the login page</div>
  )
}

export default Logout
