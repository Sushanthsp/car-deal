import React from 'react'
import './AboutUs.css'
import { Link } from "react-router-dom";
import { BiAnchor } from 'react-icons/bi';


function Aboutus() {
  return (
    <>
      <div className="back-way">
        <Link to="/">
          <div className="backArrow">
            &#8592;
          </div>
        </Link>
      </div>
      <div className='container-body'>

        <div className="feat bg-gray pt-5 pb-5">
          <div className="container">
            <div className="row">

              <div className="section-head  ">
                <h4><span>Why Choose</span> Us?</h4>
                <p>When you choose us, you'll feel the benefit of 10 years' experience in dealing cars. Since we know the offline world and we know how to handle it. </p>
              </div>

              <div className=" ">
                <div className="item"> <span className="icon feature_box_col_one"><BiAnchor/></span>
                  <h2>Best Deals</h2>
                  <p>We use latest technology for the latest world because we know the demand of peoples.</p>
                </div>
              </div>
              <div className=" ">
                <div className="item"> <span className="icon feature_box_col_two"><BiAnchor/></span>
                  <h2>1M+ Dealers</h2>
                  <p>We always listen our customers first and keeppig these things in mind we make beast deals.</p>
                </div>
              </div>
              <div className=" ">
                <div className="item"> <span className="icon feature_box_col_three"><BiAnchor/></span>
                  <h2>24 x 7 User Support</h2>
                  <p>If our customer has any problem and any query we are always happy to help then.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </>

  )
}

export default Aboutus