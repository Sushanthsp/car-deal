import React,{useState,useEffect} from 'react'
import './Navbar.css';
import img from '../../assets/bmw.png'
import Form from '../form/form';
import { Link } from "react-router-dom";
import { AiFillCar } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { auth } from '../../config/firebaseinit'

function Navbar() {

  const SignOut = () =>{
    auth.signOut()
}

  const [scroll, setScroll] = useState(false);

  const listenScrollEvent = e => {
    if (window.scrollY > 400) {
     setScroll(true)
    } else {
      setScroll(false)
    }
  }

  useEffect(() => {
      window.addEventListener('scroll',listenScrollEvent)

      return () => {
        window.removeEventListener('scroll',listenScrollEvent)
      }
  })
  
  return (
    <div className='navbar'>
      <div className={scroll? "bg-color": "nav-body"}>
        <div className="logo">
         <AiFillCar/> 
          -Deal 
        </div>
        <div className="right-grid">
          <div className="navigation">
            
            <Link  to="/">
            
          <div>Home</div> 
          </Link>
            
           
            <Link  to="/aboutus">
            
            <div>About us</div>
             
           </Link>
           
            <Link  to="/dashboard">
            <div>Dashboard</div>
           </Link>
            
          </div>
          <div className="authentication" onClick={SignOut}>
          <Link  to="/">
            <div> <AiOutlineLogout/></div>
           </Link>
          </div>
        </div>
      </div>
      <h1 className="img-body">
      Sell Your Car For The Best Price in India
      </h1>
      <div className="card-img">
        <img src={img} alt="" className='img' />
      </div>
      <Form/>
    </div>

  )
}

export default Navbar