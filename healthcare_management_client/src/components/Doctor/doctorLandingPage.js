/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Card from '../Reusable/card'
export const doctorLandingPage = () => {
  return (
    <div className='fluid-container'>
      <div className='row g-0 p-5'>
          <div className='col-sm-4 p-1'>
            <Card color="card-color-tomato" type='IconsR' icon="faCalendarDays" title="Manage Schedule" link='/user/doctor/schedule'/>
          </div>
          <div className='col-sm-4 p-1'>
            <Card color="card-color-green" type='IconsR' icon="faEye" title="View Appointments" link='/user/doctor/view/appointments'/>
          </div>
          <div className='col-sm-4 p-1'>
          <Card color="card-color-purple" type='IconsS' icon="faBedPulse" title="Admitted Patients" link="/view/admit/patient"/>
        </div>
          <div className='col-sm-4 p-1'>
            <Card color="card-color-yellow" type='IconsS' icon="faHospital" title="Hospital Details" link='/user/doctor/view/facility/details'/>
          </div>
      </div>
    </div>
  )
}
export default doctorLandingPage