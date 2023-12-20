import React, {useEffect, useState} from 'react'
import {useNavigate}  from 'react-router-dom'
import contactuspic from '../images/contactus.jpg'

const Contactus = () => {

  const navigation = useNavigate();
  const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});

  const callContactPage = async () => {

    try {
      const res = await fetch('/getData', {
        method:'GET',
        headers: {

          "Content-Type":"application/json"
        },
        credentials: 'include', // Include this line


      });

      const data = await res.json();
      console.log(data);
      setUserData({...userData, name:data.name, email:data.email, phone:data.phone})
      

      if(!res.status === 200)
      {
        const error = new Error(res.error);
        throw error;
      }

      
    } catch (error) {
      console.log(error);
      navigation('/signin');
    }

  }

  useEffect(() => {
    
    callContactPage() 
  
  }, [])

  // storing the Data in the state

  const handleInputs =  (e) => {

    const name = e.target.name;
    const value = e.target.value;

    //saving dynamic Data on the state

    setUserData({...userData, [name]:value})

  }

  // sending the state Data to the Backend

  const contactForm = async (e) => {

    e.preventDefault();

    //object destructor

    const {name, email, phone, message} = userData;

    
    if(!message)
    {
        return window.alert("Message Can't be left blank")
    }

    try{

      const res = await fetch('/contactus', {
        method:"POST",
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify({name:name, email:email, phone:phone, message:message})
      });

      const data = await res.json();

      if(!data)
      {
        window.alert('Message are not sent')
      }
      else{
        window.alert('Message Sent Successfully');
        setUserData({...userData, message:""});
      }


    }

    catch(err)
    {
      console.log(err);
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
              <h2 class="text-uppercase text-center mb-5">Welcome to Contact Us Page</h2>

              {/* image for contact us page  */}

              <div className='form-outline'>
                <img src={contactuspic} alt='contactus' className='img-fluid' />
              </div>

              {/* post data form  */}

              <form method='POST' className='contact-form' id='contact-form'>

                <div class="form-outline mb-4">
                      <label class="form-label" for='name'> <i class="zmdi zmdi-account material-icons-name"></i> Name</label>
                        <input type="text" id="contactyourname" class="form-control form-control-lg" placeholder='Enter your name'
                        name='name'                        
                        value = {userData ? userData.name : 'N/A'}
                        onChange={handleInputs}
                        autoComplete='off' required />
                </div>

                <div class="form-outline mb-4">
                      <label class="form-label" for='phone'> <i class="zmdi zmdi-account material-icons-phone"></i> Phone</label>
                        <input type="number" id="contactyourdial" class="form-control form-control-lg" placeholder='Enter your number'
                        name='phone'                        
                        value = {userData ? userData.phone : 'N/A'}
                        onChange={handleInputs}
                        autoComplete='off' required />
                </div>


                <div class="form-outline mb-4">
                <label class="form-label" for="contactlabelemail"><i class="zmdi zmdi-email"></i> Email</label>
                  <input type="email" id="contactformyouremail" class="form-control form-control-lg" placeholder='Enter your email'
                  value = {userData ? userData.email: 'N/A'}                  
                  name='email'
                  onChange={handleInputs}
                  autoComplete='off' required />
                </div>

                <div class="form-outline mb-4">
                <label class="form-label" for="contactlabelmessage"><i class="zmdi zmdi-email"></i> Message</label>
                  <textarea id="contactformmessage" class="form-control form-control-lg" placeholder='Let the cat out of the bag...'                 
                 name='message'
                 value={userData.message}
                  onChange={handleInputs}
                  autoComplete='off' required />
                </div> 
                
                                     
               
                <div class="form-outline form-group form-button">
                  <input type='submit' name='contactus' id="contactus" className='form-submit button-color' value="Submit" onClick={contactForm} />                
                </div>                    
              

              </form>

              



            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
        
    </>
  )
}

export default Contactus
