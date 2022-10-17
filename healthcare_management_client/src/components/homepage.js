import React from 'react'
import '../assets/CSS/common.css'
import '../assets/CSS/homepage.css'
import Carousel from 'react-bootstrap/Carousel';
const homepage=()=>{
    return(
        <div className='main container-fluid g-0'>
          <div className='row g-0'>
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
          <div className='row mt-4 g-0'>
            <h2 className='text-center g-0'>Our Services</h2>
          </div>
          <div className='row g-0'>
              <div className='col-sm-12 col-md-6 col-lg-4 p-3'>
                <div className='card p-4 h-100'>
                    <h4 className='text-center'>Facility Management</h4>
                    <img src="Images/facility.png" alt="Ambulance" className='roundImage' />
                    <p className='mt-3'>HMS collects all information and makes it readily available whenever required. Your receptionist can easily
                     check the information from the system and convey it to those who seek it. 
                    </p>
                </div>
              </div>

              <div className='col-sm-12 col-md-6 col-lg-4 p-3'>
                <div className='card p-4 h-100'>
                    <h4 className='text-center'>Doctor Consultation</h4>
                    <img src="Images/doctor.webp" alt="Doctor" className='roundImage' />
                    <p className='mt-3'>Urgent Care video visits from us let you have a live video chat with a
                     qualified healthcare provider, 24 hours a day, 7 days a week.
                     All you need is a camera-enabled mobile, laptop or tablet. 
                    </p>
                </div>
              </div>

              <div className='col-sm-12 col-md-6 col-lg-4 p-3'>
                <div className='card p-4 h-100'>
                    <h4 className='text-center'>Medical History</h4>
                    <img src="Images/record.jpg" alt="Record" className='roundImage' />
                    <p className='mt-3'>You can track your all medical record and download them when required.
                    It helps to analyze your medical history for video visits.You can choose to share the records, by default sharing is off.
                    </p>
                </div>
              </div>

              {/* <div className='col-sm-12 col-md-6 col-lg-4'>
                <div className='card p-4'>
                    <h4 className='text-center'>Pharmacy</h4>
                    <img src="Images/pharmacy.webp" alt="Pharmacy" className='roundImage' />
                    <p className='mt-3'>Get your medicines 24/7 by uploading the online prescription.<br/>
                    Get your medicine 24/7 by uploading the online prescription.
                    </p>
                </div>
              </div> */}
          </div>
        </div>
        
    )
}

export default homepage