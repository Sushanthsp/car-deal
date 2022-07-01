import React, { useState } from 'react'
import './Form.css'
import { useCreatePostMutation } from '../../store/cars/carServices';
import { auth } from '../../config/firebaseinit'

function Form() {

  const [createPost] = useCreatePostMutation();

  const [carInfo, setCarInfo] = useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email,
    carBrand:'',
    carModel:'',
    year:null,
    carRegisteredState:'',
   kilometersDriven:null,
    
    bid:null,
  
   dealersBid:null 
  })
   
const [file, setFile] = useState('')
const [imgUrl, setImgUrl] = useState(null)

  const onChange = (e) => {
    setCarInfo({ ...carInfo, [e.target.name]: e.target.value })
  }
  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
    setFile(file)
    setImgUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const postCarDetails = (e) => {
    e.preventDefault()
    createPost({...carInfo,...file,...imgUrl})
  }

  return (
    <div className="view-width">
      <div className="form">

        <div className='form-wrapper'>
          <h2 className="form-input">
            Sell your car at one click button
          </h2>
          <form action="">
            <div className="form-grp">
              <label htmlFor="carBrand">Car Brand</label>
              <input type="text" name='carBrand' placeholder='Your car brand' className="input" onChange={onChange} />

            </div>

            <div className="form-grp">
              <label htmlFor="carModel">Car Model</label>
              <input type="text" name='carModel' placeholder='Your car Model' className="input" onChange={onChange} />

            </div>

            <div className="form-grp">
              <label htmlFor="year">Year</label>
              <input type="number" name='year' placeholder='year' className="input" onChange={onChange} />

            </div>

            <div className="form-grp">
              <label htmlFor="carRegisteredState">Your car Registered state</label>
              <input type="text" name='carRegisteredState' placeholder='Your car Registered state' className="input" onChange={onChange} />

            </div>

            <div className="form-grp">
              <label htmlFor="KilometersDriven">Kilometers driven</label>
              <input type="number" name='kilometersDriven' placeholder='Kilometers driven' className="input" onChange={onChange} />

            </div>

            <div className="form-grp">
              <label htmlFor="image">upload image</label>
              <input type="file" name='image' placeholder='upload image' className="input-img" onChange={handleImageChange} />

            </div>


            <div className="form-grp">
              <label htmlFor="bid">Bid your price</label>
              <input type="number" name='bid' placeholder='Your bid price' className="input" onChange={onChange} />

            </div>

            <button className='button' onClick={postCarDetails}>Bid your car</button>
          </form>
        </div>

        <div className="flex">
          <div className="container">
            <h2>Car-deal can provide you best deal by sharing few details with us</h2>
            <div className="box">
              <h2>Our Qualities</h2>
              <ol>
                <li>Best price</li>
                <li>No hidden charges</li>
                <li>1 Crore+ cars sold</li>
                <li>Find Dealer within 1 day</li>
                <li>1M+ Dealers registered</li>
                <li>Free pickup</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Form