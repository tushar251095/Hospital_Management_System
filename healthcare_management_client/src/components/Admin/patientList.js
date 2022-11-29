import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import helper from '../../helper/helper'
import axios from '../../services/axios'
export const PatientList = () => {
    const navigate = useNavigate()
    const [patientList,setPatientList]=useState([])
    useEffect(()=>{
        getAllPatients()
    },[])
    const getAllPatients=()=>{
        axios.get('/get/all/patient')
        .then(result=>{
            setPatientList(result.data)
        })
    }
    const getPatientHistory = (e, id) => {
        e.preventDefault();
        localStorage.setItem("patientId", id);
        navigate("/user/doctor/patient/history");
      };
  return (
    <div className='container-fluid'>
        <div className='row mt-3'>
            <div className='col-sm-12'>
                <h3 className='text-center text-dark'>Patients List</h3>
            </div>
        </div>
        <div className='row mt-3 p-2'>
            {
                patientList.length==0 &&
                <div className='col-sm-12 p-5 border border-secondary'>
                    <h3 className='text-secondary text-center'>Patient details not available</h3>
                </div>
            }
             {
                patientList.length>0 &&
                <div className='col-sm-12'>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Gender</th>
                                <th>Contact</th>
                                <th>Email</th>
                                <th>Blood Group</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                patientList.map((patient,index)=>{
                                    return <tr key={index}>
                                        <td>{helper.capitalName(patient.firstName) + " " + helper.capitalName(patient.lastName)}</td>
                                        <td>{patient.gender}</td>
                                        <td>{patient.contact}</td>
                                        <td>{patient.email}</td>
                                        <td>{patient.bloodGroup}</td>
                                        <td>
                                            <button className='btn btn-primary btn-sm' onClick={(e)=>getPatientHistory(e,patient.patientId)}>View records</button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
            
        </div>
    </div>
  )
}

export default PatientList