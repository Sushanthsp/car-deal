import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './navbar/navbar'
import Aboutus from './aboutus/aboutus'
import Dashboard from './dashboard/Dashboard'
import SignIn from './authentication/Login';
import { auth } from '../config/firebaseinit'
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from './Loading/Loading';
import { useGetAllPostQuery } from '../store/cars/carServices';

function Body() {
  const response = useGetAllPostQuery();
  const [authState] = useAuthState(auth);
  
  return (
    <div>
      {( authState && response.isSuccess)? <Router>
        <Routes>
          <Route exact path="/" element={<Navbar />} />
          <Route exact path="/aboutus" element={<Aboutus />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router> :  (!response.isSuccess ? <Loading/>: <SignIn />)}
    
    </div>
  )
}

export default Body