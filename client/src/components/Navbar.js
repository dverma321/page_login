import React, {useEffect, useState, useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import logo from "../images/icon480_480/user-icon.png"
import { userContext } from '../App'
import { NavLink } from 'react-router-dom'


const Navbar = () => {

  const {state, dispatch} = useContext(userContext)
  const RenderMenu = () => {
   if(state)
   {
    return (
      <>
      <li class="nav-item">
          <NavLink class="nav-link active" aria-current="page" to="/" style={{color:'#32302F', textDecoration:'none', fontWeight:'bold'}}>Home</NavLink>
        </li>            

        <li class="nav-item">
          <NavLink class="nav-link" to="/aboutme" style={{color:'#32302F', textDecoration:'none'}}>My Profile</NavLink>
        </li>
        <li class="nav-item">
          <NavLink class="nav-link" to="/contactus" style={{color:'#32302F', textDecoration:'none'}}>Contact Us</NavLink>
        </li>
        <li class="nav-item">
          <NavLink class="nav-link" to="/logout" style={{color:'#32302F', textDecoration:'none'}}>Logout</NavLink>
        </li>
      
      </>
    )
   
   }
   else{
    return (
      <>
      <li class="nav-item">
          <NavLink class="nav-link active" aria-current="page" to="/" style={{color:'#32302F', textDecoration:'none', fontWeight:'bold'}}>Home</NavLink>
        </li>
        <li class="nav-item">
          <NavLink class="nav-link" to="/signin" style={{color:'#32302F', textDecoration:'none'}}>Login</NavLink>
        </li>
        <li class="nav-item">
          <NavLink class="nav-link" to="/registration" style={{color:'#32302F', textDecoration:'none'}}>Registration</NavLink>
        </li>

        <li class="nav-item">
          <NavLink class="nav-link" to="/aboutme" style={{color:'#32302F', textDecoration:'none'}}>My Profile</NavLink>
        </li>
        <li class="nav-item">
          <NavLink class="nav-link" to="/contactus" style={{color:'#32302F', textDecoration:'none'}}>Contact Us</NavLink>
        </li>
        
      
      </>
    )
   }
  }



  return (
    <>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand">Verma Enterprises</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <RenderMenu />             
       
      </ul>
     
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar