/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Card from '../Reusable/card'
export const adminLandingPage = () => {
  return (
    <div className='fluid-container'>
    <div className='row g-0 p-5'>
        <div className='col-sm-4'>
          <Card color="card-color-tomato" type='IconsR' icon="faPlusSquare" title="Add Doctor" link="/add/doctor"/>
        </div>
    </div>
  </div>
  )
}

export default adminLandingPage
