/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Card from '../Reusable/card'

export const patientLandingPage = () => {
  return (
    <div className='fluid-container'>
      <div className='row g-0 p-5'>
          <div className='col-sm-4 p-1'>
            <Card color="card-color-tomato" type='IconsR' icon="faCalendarCheck" title="Book Appointment" link='/user/patient/specialities'/>
          </div>
          <div className='col-sm-4 p-1'>
            <Card color="card-color-green" type='IconsR' icon="faListAlt" title="Medical History"  link='/user/patient/records'/>
          </div>
          <div className='col-sm-4 p-1'>
            <Card color="card-color-yellow" type='IconsR' icon="faClockFour" title="My Appointment" link='/user/patient/appointments'/>
          </div>
      </div>
    </div>
  )
}
export default patientLandingPage