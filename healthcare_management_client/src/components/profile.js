import React, { useEffect, useState } from 'react'
import axios from '../services/axios'
export const Profile = () => {
    const [profile,setProfile]=useState({})
    var imageBasePath = window.location.protocol + "//" + window.location.host + "/Images/avatar.png";
    useEffect(()=>{
        getProfile()
    },[])
    const getProfile=()=>{
            axios.get('/get/profile/'+localStorage.getItem('id')+"/"+localStorage.getItem('role'))
            .then((result)=>{
                setProfile(result.data)
            })
    }
  return (
    <div className='container-fluid'>
        <div className='row mt-3'>
            <div className='col-sm-12'>
                <h3 className='text-dark text-center'>Profile</h3>
            </div>
        </div>
            <div className='row justify-content-center'>
                <div className='col-sm-8'>
                    <div className='card p-3'>
                        <div className='text-center'>
                            <img src={imageBasePath} height="150" width="150" alt="profilePicture"/>
                        </div>
                        <table className='table table-bordered table-striped'>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{profile.firstName+" "+profile.lastName}</td>
                                </tr>
                                <tr>
                                    <th>Gender</th>
                                    <td>{profile.gender}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{profile.email}</td>
                                </tr>
                                <tr>
                                    <th>Contact</th>
                                    <td>{profile.contact}</td>
                                </tr>
                                {
                                    localStorage.getItem('role')=='doctor' && 
                                    <tr>
                                        <th>Specialization</th>
                                        <td>{profile.specialization}</td>
                                    </tr>
                                }
                                {
                                    localStorage.getItem('role')=='patient' && 
                                    <tr>
                                        <th>Height</th>
                                        <td>{profile.height}</td>
                                    </tr>
                                }
                                 {
                                    localStorage.getItem('role')=='patient' && 
                                    <tr>
                                        <th>Weight</th>
                                        <td>{profile.weight}</td>
                                    </tr>
                                }
                                 {
                                    localStorage.getItem('role')=='patient' && 
                                    <tr>
                                        <th>Blood Group</th>
                                        <td>{profile.bloodGroup}</td>
                                    </tr>
                                }
                                
                                    
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Profile