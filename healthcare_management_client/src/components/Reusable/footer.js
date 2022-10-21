// import React, {Componeimport React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCopyright} from '@fortawesome/free-regular-svg-icons'
import {faFacebook, faInstagram, faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons'
const mainFooter={
   main:{
     backgroundColor:'#BDC9EA',
     position: 'relative',
     left: '0',
     bottom: '0'
   },
   bottomFotter:{
    backgroundColor:'#7F93CB',
   }
}
var imageBasePath = window.location.protocol + "//" + window.location.host + "/Images/logo.png";
const Footer=()=>{
    return(
        <div className='container-fluid container-fluid footer mt-auto g-0' style={mainFooter.main}>
            <div className='row g-0 p-5'>
                <div className='col-sm-3 d-flex justify-content-center'>
                    <img className='' src={imageBasePath} alt='logo' height='90' width='80' />
                </div>
                <div className='col-sm-3'>
                <h4>Home</h4>
                <h4>About Us</h4>
                <h4>FAQs</h4>
                </div>
                <div className='col-sm-3'>
                    <h4>Contact:</h4>
                    <p>9515 University Terrace Drive
                    <br/>Apt L,Charlotte, NC<br/>
                    28262, United States</p>

                </div>
                <div className='col-sm-3'>
                <div className='mt-5 ms-5'>
                    <FontAwesomeIcon icon={faFacebook} size="2x" style={{ color: 'blue' }} className="" />
                    <FontAwesomeIcon icon={faTwitter} size="2x" style={{ color: '#38C7F1' }} className="ms-3"/>
                    <FontAwesomeIcon icon={faInstagram} size="2x" style={{ color: '#F14F38' }} className="ms-3"/>
                    <FontAwesomeIcon icon={faYoutube} size="2x" style={{ color: 'red' }} className="ms-3"/>
                    </div>
                </div>
            </div>
            <div className="row g-0">
           
                <div className="col-sm-12 text-center text-light p-1"  style={mainFooter.bottomFotter}>
                    <p className="mt-2">Copyright&nbsp; <FontAwesomeIcon icon={faCopyright} size="1x" />&nbsp;2022 Healthcare Management</p>
                </div>
            </div>   
        </div>
    )
}



export default Footer