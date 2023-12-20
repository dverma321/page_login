import React, { useEffect, useState } from 'react'
import {useNavigate}  from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import userpic from "../images/1.jpg"

const About = () => {

  const navigation = useNavigate();
  const [userData, setUserData] = useState();

  const callAboutPage = async () => {

    try {
      const res = await fetch('/aboutme', {
        method:'GET',
        headers: {
          Accept:"application/json",
          "Content-Type":"application/json"
        },
        credentials:"include"

      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

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
    
    callAboutPage() 
  
  }, [])
  
  
  return (
    <>
      <div className='container emp-profile mt-5'>
        <form method='GET'>
          <div className='row'>
            <div className='col-md-4'>
              <div className='profile-img'>
              <img src={userpic} alt="userpic" className='img-fluid' />

              </div>
            </div>

            <div className='col-md-6'>
              <div className='profile-head'>
                <h5>{userData ? userData.name : 'N/A'}</h5>
                <h6>Professional : {userData ? userData.work : 'N/A'}</h6>
                <p className='profile-rating mt-3 mb-5'>Ranking :  <span>1/10</span></p>

                <ul className="nav nav-tabs" role='tablist'>
                  <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" role='tab' aria-current="page" href="#home">About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" id='profile-tab'  data-toggle="tab" role='tab' href="#profile">Timelines</a>
                  </li>                  
                </ul>
              </div>              
            </div>

            <div className='col-md-2'>
              <input type='submit' className='profile-edit-btn' value="Edit Profile" />
            </div>

            <div className='row'>
              {/* left side url  */}
              <div className='col-md-4'>
                <div className='profile-work'>
                  <label style={{background:'lightpink', color:'white', padding:'1%'}}>WORK LINK :-</label><br />
                  <a href='' style={{textDecoration:'None', color:'lightgreen'}} >YouTube</a><br />
                  <a href='' style={{textDecoration:'None', color:'lightgreen'}} >GitHub</a><br />
                  <a href='' style={{textDecoration:'None', color:'lightgreen'}} >Sap UI5/Fiori</a><br />
                  <a href='' style={{textDecoration:'None', color:'lightgreen'}} >JavaScript</a><br />
                  <a href='' style={{textDecoration:'None', color:'lightgreen'}} >MERN</a><br />
                </div>
              </div>

              {/* Right hand side data  */}
              <div className='col-md-8 pl-5 about-info'>
                <div className='tab-content profile-tab' id="myTabContent">
                  <div className='tab-pane fade show active' id="home" role='tabpanel' aria-labelledby='home-tab' >
                    <div className='row'>
                      <div className='col-md-6'>
                        <label>User ID</label>
                      </div>
                      <div className='col-md-6'>
                        <p>{userData ? userData._id : 'N/A'}</p>
                      </div>
                    </div>

                    <div className='row mt-3'>
                      <div className='col-md-6'>
                        <label>Name</label>
                      </div>
                      <div className='col-md-6'>
                        <p>{userData ? userData.name : 'N/A'}</p>
                      </div>
                    </div>

                    <div className='row mt-3'>
                      <div className='col-md-6'>
                        <label>Email</label>
                      </div>
                      <div className='col-md-6'>
                        <p>{userData ? userData.email : 'N/A'}</p>
                      </div>
                    </div>

                    <div className='row mt-3'>
                      <div className='col-md-6'>
                        <label>Phone</label>
                      </div>
                      <div className='col-md-6'>
                        <p>{userData ? userData.phone : 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div className='row mt-3'>
                      <div className='col-md-6'>
                        <label>Work</label>
                      </div>
                      <div className='col-md-6'>
                        <p>{userData ? userData.work : 'N/A'}</p>
                      </div>
                    </div>



                  </div>

                </div>
              </div>

            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default About