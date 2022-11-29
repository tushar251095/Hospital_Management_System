/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Card from '../Reusable/card'
const adminLandingPage = () => {
  return (
    <div className='fluid-container'>
    <div className='row g-0 p-5'>
        <div className='col-sm-4 p-3'>
          <Card color="card-color-yellow" type='IconsS' icon="faBed" title="Admit Request" link="/admin/view/admit/request"/>
        </div>
        <div className='col-sm-4 p-3'>
          <Card color="card-color-purple" type='IconsS' icon="faBedPulse" title="Admitted Patients" link="/view/admit/patient"/>
        </div>
        <div className='col-sm-4 p-3'>
          <Card color="card-color-tomato" type='IconsR' icon="faPlusSquare" title="Add Doctor" link="/add/doctor"/>
        </div>
        <div className='col-sm-4 p-3'>
          <Card color="card-color-darkgreen" type='IconsS' icon="faUserDoctor" title="View Doctors" link="/view/doctors"/>
        </div>
        <div className='col-sm-4 p-3'>
          <Card color="card-color-blue" type='IconsS' icon="faHospital" title="Facility Details" link="/hospital/details"/>
        </div>
        <div className='col-sm-4 p-3'>
          <Card color="card-color-green" type='IconsS' icon="faUsers" title="Patients List" link="/user/admin/patient/list"/>
        </div>
    </div>
  </div>
  )
}
export default adminLandingPage
