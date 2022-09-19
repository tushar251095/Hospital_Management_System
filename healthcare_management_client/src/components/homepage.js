import React from 'react'
import '../assets/CSS/common.css'
import '../assets/CSS/homepage.css'
import Carousel from 'react-bootstrap/Carousel';
const Header=()=>{
    return(
        <div className='main container-fluid'>
          <div className='row'>
            <Carousel fade>
              <Carousel.Item>
                <div className='banner1'></div>
                <Carousel.Caption>
                  <h3>Empowering People to Improve Their Lives</h3>
                  <p>Come to expect the best, Where care comes first.</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <div className='banner2'></div>
                <Carousel.Caption>
                  <h3>Empowering People to Improve Their Lives</h3>
                  <p>Come to expect the best, Where care comes first.</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <div className='banner3'></div>
                <Carousel.Caption>
                  <h3>Empowering People to Improve Their Lives</h3>
                  <p>Come to expect the best, Where care comes first.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className='row mt-4'>
            <h2 className='text-center'>Our Services</h2>
          </div>
          <div className='row p-5'>
              <div className='col-sm-3'>
                <div className='card p-4'>
                    <h3 className='text-center'>Ambulance</h3>
                    <img src="Images/ambulance.jpg" alt="Ambulance" className='roundImage' />
                    <p className='mt-3'>Ambulance services provide medically necessary treatment for Medicaid recipients.<br/>
                    Services include emergency and non-emergency ambulance transport by ground and air
                    </p>
                </div>
              </div>

              <div className='col-sm-3'>
                <div className='card p-4'>
                    <h3 className='text-center'>Online Doctor Consultation</h3>
                    <img src="Images/doctor.webp" alt="Doctor" className='roundImage' />
                    <p className='mt-3'>Urgent Care video visits from us let you have a live video chat with a
                     qualified healthcare provider, 24 hours a day, 7 days a week.
                     All you need is a camera-enabled device. 
                    </p>
                </div>
              </div>

              <div className='col-sm-3'>
                <div className='card p-4'>
                    <h3 className='text-center'>Tracking Medical Record</h3>
                    <img src="Images/record.jpg" alt="Record" className='roundImage' />
                    <p className='mt-3'>You can track your all medical record and download them when required.
                    It helps to analyze your medical history for video visits.You can choose to share the records, by default sharing is off.
                    </p>
                </div>
              </div>

              <div className='col-sm-3'>
                <div className='card p-4'>
                    <h3 className='text-center'>Pharmacy</h3>
                    <img src="Images/pharmacy.webp" alt="Pharmacy" className='roundImage' />
                    <p className='mt-3'>Get your medicines 24/7 by uploading the online prescription.<br/>
                    Get your medicine 24/7 by uploading the online prescription.
                    </p>
                </div>
              </div>
          </div>
        </div>
        
    )
}

export default Header