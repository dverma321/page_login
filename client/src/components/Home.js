import React, {useEffect, useState} from 'react';
import mainpic from '../images/png/white_tree.png'
import carousel1 from '../images/1.jpg'
import carousel2 from '../images/4.jpg'
import carousel3 from '../images/5.jpg'

const App = () => {


  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);
  const baseUrl = "https://logindatabase-j1ud.onrender.com"; //backend url
    
  const callCustomerName = async () => {

    try {
      const res = await fetch(`${baseUrl}/getData`, {
        method:'GET',
        headers: {

          "Content-Type":"application/json"
        },


      });

      const data = await res.json();
      console.log(data);      
      setUserName(data.name);      
      setShow(true);
      
      
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    
    callCustomerName() 
  
  }, [])





  return (
    <>

    <div class="welcomeBlock">
      <div className='left'>
        <img src={mainpic} alt="white_tree_logo" className='img-fluid' />
      </div>
      <div className='right'>
      <div className='welcomeuser'>
      <h1>Welcome</h1>
      <h2>{userName} </h2>
      </div>
      <p>{ show ? 'Welcome back again, hope you are enjoying this website...': 'We are the Professional seller...'}</p>
    </div>

      </div>
      

    {/* carousel started  */}
    
        <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active"
              aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
              aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
              aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active" data-bs-interval="5000">
              <img src={carousel1} class="d-block w-100" alt="carousel 1" />
              <div class="carousel-caption d-none  d-md-block">
                <h5>Learn Programming with our courses</h5>
                <p>Be the Boss of yourself and updated with your codes <br /> Learn with us</p>
              </div>
            </div>
            <div class="carousel-item" data-bs-interval="5000">
              <img src={carousel2} class="d-block w-100" alt="carousel 2" />
              <div class="carousel-caption d-none d-md-block">
                <h5>Updated with Your Market Using our Apps</h5>
                <p>Apps that will never put in loss whether your market is up or down<br /> Make your own
                  decision with our apps</p>
              </div>
            </div>
            <div class="carousel-item" data-bs-interval="5000">
              <img src={carousel3} class="d-block w-100" alt="carousel 3" />
              <div class="carousel-caption d-none d-md-block">
                <h5>Make your Android more powerful</h5>
                <p>Use our paid apps that will unlock the power of your android or smart Gadgets</p>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

    {/* carousel ended  */}
      

    
    </>


     

    
  );
};

export default App;
