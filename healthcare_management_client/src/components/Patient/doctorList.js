/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useState,useEffect } from 'react';
import axios from '../../services/doctorService'
import { useNavigate } from 'react-router-dom';
import helper from '../../helper/helper'
export const DoctorList = () => {
    const [list,setList]=useState([])
    var imageBasePath = window.location.protocol + "//" + window.location.host + "/Images/avatarMale.png";
    const navigate=useNavigate();
    useEffect(() => {
        axios.get('/specality/'+localStorage.getItem('specId'))
        .then(res=>{
            setList(res.data)
            //console.log(res.data)
        })
        .catch(error=>{
            console.log(error)
        })
    },[]);
    const onClickCard=(id)=>{
        localStorage.setItem('doctorId',id);
        navigate('/user/patient/bookappointment')
    }
  return (
    <div className='container-fluid'>
        
        <div className='row g-0 mt-3'>
            <div className='col-sm-12'>
                <h3 className='text-center'>Doctors List</h3>
            </div>
        </div>
        <div className='row g-0 mt-3'>
        {list.map(doctor => {
                return <div key={doctor.doctorId} className="col-sm-12 col-md-4 col-lg-3 p-2" >
                    <div className='card' style={{cursor:"pointer",minHeight:"130px"}} onClick={()=>onClickCard(doctor.doctorId)}>
                        <div className='row'>
                            
                            <div className='col-sm-4 mt-4'>
                            {
                                doctor.gender=='Male' && 
                                <img src={imageBasePath} height='80' width='80' alt='profile' className='float-start rounded'/>
                            }
                             {
                                doctor.gender=='Female' && 
                                <img src={'https://static.vecteezy.com/system/resources/previews/005/241/180/original/doctor-avatar-character-standing-in-the-circle-flat-style-design-illustration-isolated-on-white-background-medical-clinic-hospital-staff-employee-icon-vector.jpg'} height='80' width='80' alt='profile' className='float-start rounded'/>
                            }
                            </div>
                            <div className='col-sm-8'>
                                <h4 className='mt-4'>{helper.capitalName(doctor.firstName)+" "+helper.capitalName(doctor.lastName)}</h4>
                                <p>{doctor.specialization}</p>
                            </div>
                        </div>
                    </div>
                </div>
        }
        )}
        </div>
    </div>
  )
}

export default DoctorList