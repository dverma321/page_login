import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import signuppic from "../images/signup.webp"

const Registration = () => {

  const history = useNavigate();

  const [user, setUser] = useState({ name:"", email:"", phone:"", work:"", password:"", cpassword:""});

  let name, value;

  const handleInputs = (event) => {
    
    console.log(event);
    name = event.target.name;
    value = event.target.value;

    setUser({...user, [name]:value});
  }

  const postDataToBackend = async (e) => {
    
    e.preventDefault();
    const {name, email, phone, work, password, cpassword} = user;

    if(!name || !email || !phone || !work || !password || !cpassword)
    {
      return window.alert("Please fill all the fields...");
    }

    if(password != cpassword)
    {
      return window.alert("password are not the same")
    }

    const res = await fetch("/registration" , {
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        name, email, phone, work, password, cpassword
      })
    });

    const data = await res.json();

    if(data.status === 422 || !data)
    {
      window.alert('Invalid Registration  or Email/Phone number already exits');
      console.log("Invalid Registration");
    }
    else{
      window.alert(' Registration Successful');
      console.log(" Registration Successful");
      history("/signin") // Login page of front end

    }


  }

  return (

    <>
      
        <div class="mask d-flex align-items-center h-100 gradient-custom-3 mt-5">
          <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                <div class="card">
                  <div class="card-body p-5">
                    <h2 class="text-uppercase text-center mb-5">Create an account</h2>

                    <div className='form-outline'>
                      <img src={signuppic} alt='image' className='img-fluid' />
                    </div>

                    <form method='POST' className='register-form' id='register-form'>

                      <div class="form-outline mb-4">
                      <label class="form-label" for='name'> <i class="zmdi zmdi-account material-icons-name"></i> Name</label>
                        <input type="text" name="name" id="formyourname" class="form-control form-control-lg" placeholder='Enter your name' autoComplete='off'
                        value={user.name} 
                        onChange={handleInputs}
                        required />
                      </div>

                      <div class="form-outline mb-4">
                      <label class="form-label" for="labelemail"><i class="zmdi zmdi-email"></i> Email</label>
                        <input type="email" name="email" id="formyouremail" class="form-control form-control-lg" placeholder='Enter your email' autoComplete='off'
                        value={user.email} 
                        onChange={handleInputs}
                        required />
                      </div>

                      <div class="form-outline mb-4">
                      <label class="form-label" for="labelwork"><i class="zmdi zmdi-slideshow"></i> Work</label>
                        <input type="text" name="work" id="formwork" class="form-control form-control-lg" placeholder='Enter your professional' autoComplete='off'
                        value={user.work} 
                        onChange={handleInputs}
                        required />
                      </div>

                      <div class="form-outline mb-4">
                      <label class="form-label" for="labelphone"><i class="zmdi zmdi-phone"></i> Phone</label>
                        <input type="number" name="phone" id="formphone" class="form-control form-control-lg" placeholder='Enter your number' autoComplete='off'
                        value={user.phone} 
                        onChange={handleInputs}
                        required />
                      </div>

                      <div class="form-outline mb-4">
                      <label class="form-label" for="labelyourpassword"><i class="zmdi zmdi-lock"></i> Password</label>
                        <input type="password" name="password" id="formyourpassword" class="form-control form-control-lg" placeholder='Enter password' autoComplete='off'
                        value={user.password} 
                        onChange={handleInputs}
                        required />
                      </div>

                      <div class="form-outline mb-4">
                      <label class="form-label" for="labelconfirmpassword"><i class="zmdi zmdi-lock"></i> Repeat your password</label>
                        <input type="password" name="cpassword" id="formconfirmpassword" class="form-control form-control-lg" placeholder='Repeat password' autoComplete='off'
                        value={user.cpassword} 
                        onChange={handleInputs}
                        required />
                      </div>

                      <div class="form-outline form-group form-button">
                        <input type='submit' name='registration' id="registration" className='form-submit button-color' value="Register" onClick={postDataToBackend} />
                      
                      </div>                    
                    

                    </form>

                    <div class="form-outline">
                      <NavLink to="/signin" className="navlink_login"><i class="zmdi zmdi-flower"></i> I am Already Registered User</NavLink>
                    </div>



                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      


    </>

  )
}

export default Registration