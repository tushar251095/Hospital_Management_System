import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../../services/patientService'
import Daxios from '../../services/doctorService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const MyAppointment = () => {
    const [Appointments,setAppointment]=useState([])
    useEffect(()=>{
        ViewAppointment()
    },[])
    const ViewAppointment=()=>{
        axios.get('/get/appoitnments/'+"pending")
        .then(res=>{
            setAppointment(res.data);
            console.log(res.data)
        })
    }
    const cancelAppointment=(e,id)=>{
        e.preventDefault()
        Daxios.put('/appointment/cancel/'+id)
        .then((res)=>{
           
            if(res.data){
                toast.success("Appointment cancelled successfully")
                ViewAppointment("pending")
            }else{
                toast.success("Something went wrong")
            }
            console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }
  return (
    <div className='container-fluid'>
        <div>
           <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
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
                            <th>Doctor</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Appointments.map((appointment,index) => {
                            return <tr key={index} >
                                <td>{index+1}</td>
                                <td>{
                                    new Date(appointment.appointmentTimestamp).toLocaleString()
                               
                                }</td>
                                <td>{appointment.doctordetails.firstName + " " + appointment.doctordetails.lastName}</td>
                                <td>{appointment.discription}</td>
                                <td><button className='btn btn-danger btn-sm' onClick={(e)=>cancelAppointment(e,appointment._id)}>Cancel</button></td>
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

export default MyAppointment