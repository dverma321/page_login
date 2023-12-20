import React, {createContext, useContext, useReducer} from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Registration from './components/Registration';
import Contactus from './components/Contactus';
import Freesoftwares from './components/Freesoftwares';
import Logout from './components/Logout';
import './App.css';
import { initialState, reducer } from './reducer/useReducer';

export const userContext = createContext();

const Routing = () => {
  return (
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/aboutme' element={<About />} />
    <Route path='/signin' element={<Login />} />
    <Route path='/registration' element={<Registration />} />
    <Route path='/contactus' element={<Contactus />} />
    <Route path='/freesoftwares' element={<Freesoftwares />} />
    <Route path='/logout' element={<Logout />} />
  </Routes>

  )
}

const App = () => {

  // 1. context API using userContext
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
    <userContext.Provider value={{state, dispatch}}>
      <Navbar />
      <Routing />
     
      </userContext.Provider>
    </>
  );
}

export default App;
