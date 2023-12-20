import React, {useContext, useState} from 'react'
import loginpic from "../images/login.jpg"
import { NavLink, useNavigate } from 'react-router-dom'

import { userContext } from '../App'


const Login = () => {

  const baseUrl = "https://logindatabase-j1ud.onrender.com"; //backend url

  const {state, dispatch} = useContext(userContext)

  const navigation = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch(`${baseUrl}/signin` , {
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email:email, password:password
      })      

    });

    const data = res.json();

    if(res.status === 400 || ! data)
    {
      window.alert("Invalid Credential...");
    }
    else
    {
      dispatch({type:"USER", payload:true})
      window.alert("Login Successfully");
      navigation("/freesoftwares");
    }
  }


  return (
    <div class="mask d-flex align-items-center h-100 gradient-custom-3 mt-5">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card">
            <div class="card-body p-5">
              <h2 class="text-uppercase text-center mb-5">Welcome to Login Page</h2>

              {/* image for login page  */}

              <div className='form-outline'>
                <img src={loginpic} alt='image' className='img-fluid' />
              </div>

              {/* Login page credentials  */}

              <form method='POST' className='signin-form' id='signin-form'>


                <div class="form-outline mb-4">
                <label class="form-label" for="signinlabelemail"><i class="zmdi zmdi-email"></i> Email</label>
                  <input type="email" id="signinformyouremail" class="form-control form-control-lg" placeholder='Enter your email' autoComplete='off'
                  value ={email}
                  onChange= { (e) => setEmail(e.target.value)}
                  required />
                </div>                

                <div class="form-outline mb-4">
                <label class="form-label" for="signinlabelyourpassword"><i class="zmdi zmdi-lock"></i> Password</label>
                  <input type="password" id="signinformyourpassword" class="form-control form-control-lg" placeholder='Enter password' autoComplete='off' 
                  value ={password}
                  onChange={ (e) => setPassword(e.target.value)}
                  required />
                </div>
               
                <div class="form-outline form-group form-button">
                  <input type='submit' name='signin' id="signin" className='form-submit button-color' value="Login" onClick={loginUser} />
                
                </div>                    
              

              </form>

              <div class="form-outline">
                <NavLink to="/registration" className="navlink_login"><i class="zmdi zmdi-flower"></i> create account for free</NavLink>
              </div>



            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login