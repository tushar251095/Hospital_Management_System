import React from 'react'
import '../assets/CSS/common.css'
import '../assets/CSS/homepage.css'
import Carousel from 'react-bootstrap/Carousel';
const Header=()=>{
    return(
        <div className='main'>
            <Carousel fade>
        <Carousel.Item>
          {/* <img
            className="d-block w-100 banner"
            src="Images/banner1.jpeg"
            alt="First slide"
            
          /> */}
          <div className='banner1'></div>
          <Carousel.Caption>
            <h3>Empowering People to Improve Their Lives</h3>
            <p>Come to expect the best, Where care comes first.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          {/* <img
            className="d-block w-100 banner"
            src="Images/banner2.jpg"
            alt="Second slide"
          /> */}
            <div className='banner2'></div>
          <Carousel.Caption>
          <h3>Empowering People to Improve Their Lives</h3>
            <p>Come to expect the best, Where care comes first.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          {/* <img
            className="d-block w-100 banner"
            src="Images/banner1.jpeg"
            alt="Third slide"
          /> */}
            <div className='banner3'></div>
          <Carousel.Caption>
          <h3>Empowering People to Improve Their Lives</h3>
            <p>Come to expect the best, Where care comes first.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
        </div>
        
    )
}

export default Header