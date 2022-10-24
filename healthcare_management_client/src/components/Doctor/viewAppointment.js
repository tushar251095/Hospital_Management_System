import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../../services/doctorService'

export const ViewAppointment = () => {
    const [Appointments,setAppointment]=useState([])
    useEffect(()=>{
        axios.get('/view/appointments')
        .then(res=>{
            setAppointment(res.data);
            //console.log(res.data)
        })
    },[])
  return (
    <div className='container-fluid'>
    <div className='row g-0 mt-3'>
        <div className='col-sm-12'>
            <h3 className='text-center'>Current Appointments</h3>
        </div>
    </div>
    <div className='row g-0 mt-3'>
        <div className='col-sm-12'>
            <table className='table table-bordered table-striped'>
                <thead className='bg-info text-light'>
                    <tr>
                        <th>Sr.</th>
                        <th>Date</th>
                        <th>Patient Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Appointments.map((appointment,index) => {
                        return <tr key={index} >
                            <td>{index+1}</td>
                            <td>{
                                new Date(appointment.appointmentTimestamp).toLocaleString()
                           
                            }</td>
                            <td>{appointment.patientsdetails.firstName + " " + appointment.patientsdetails.lastName}</td>
                            <td>{appointment.discription}</td>
                           
                            <td><button className='btn btn-success btn-sm'>Attend</button>&nbsp;<button className='btn btn-danger btn-sm'>Cancel</button></td>
                        </tr>
                    }
                    )}
                </tbody>
                
            </table>
        </div>
    </div>

</div>
  )
}
export default ViewAppointment
