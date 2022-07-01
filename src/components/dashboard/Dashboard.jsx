import React from 'react'
import './Dashboard.css'
import { Link } from "react-router-dom";
import img from '../../assets/bmw.png'
// import {fetchAsyncCars,getAllCars} from "../../store/cars/carSlice"
// import {useDispatch , useSelector} from "react-redux"
import { useGetAllPostQuery } from '../../store/cars/carServices';
import { auth } from '../../config/firebaseinit'
import Loading from '../Loading/Loading';

function Dashboard() {

 const response = useGetAllPostQuery();

 let cars;

 if(response.isSuccess)
 {
  cars = response.data.filter(profile => profile.email === auth.currentUser.email)
 }

  return (
    <div>
{ response.isSuccess ? <div>
      <div className="back-way">
      <Link to="/">
          <div className="backArrow">
            &#8592;
          </div>
        </Link>
  </div>
         <div className="card">
        <div className="card__image">
          <img src={img} alt=""/>
        </div>
        
        <div className="card__copy">
            <h1 className='h1'>Your bid price: {cars[0].bid}</h1>
            <h2  className='h2'>27 October</h2>
          <h3>
            Name :  <p className="d-inline">{cars[0].name}</p>
          </h3>
          <h3>
            Car Brand :  <p className="d-inline">{cars[0].carBrand}</p>
          </h3>
          <h3>
            Car Model :  <p className="d-inline">{cars[0].carModel}</p>
          </h3>
          <h3>
          car Registered State :  <p className="d-inline">{cars[0].carRegisteredState}</p>
          </h3>
          <h3>
          kilometers Driven :  <p className="d-inline">{cars[0].kilometersDriven}</p>
          </h3>
          <h3>
            Year :  <p className="d-inline">{cars[0].year}</p>
          </h3>
          <h3>
            Your Price :  <p className="d-inline">{cars[0].bid}</p>
          </h3>
         { cars[0].dealersBid !== null && <h3>
            Dealers Highest Bid :  <p className="d-inline">{cars[0].dealersBid}</p>
          </h3>}
        </div>
        <button className="sell-btn">
          Sell At this price
        </button>
      </div>
    </div> : <Loading/>}
    </div>
  )
}

export default Dashboard