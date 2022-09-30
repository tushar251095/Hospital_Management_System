import React from 'react'
import {  useEffect,useState } from "react";
import axios from 'axios'
import '../assets/CSS/common.css'
import '../assets/CSS/registartion.css'
//import Services from '../services/userServices'
const userRegistartion=()=>{
    return(
        <div className='main container-fluid g-0'>
            <div className='row g-0 mt-5'>
                <div className='col-sm-12'>
                    <h3 className='text-center'>Registartion Form</h3>
                </div>
            </div>
            <div className='row g-0 p-5'>
                <div className='col-sm-12 d-flex justify-content-center'>
                    <form className='w-50 card p-5'>
                        <label className='lables'>Full Name:</label>
                        <input type={"text"} placeholder="Enter your full name" className='form-control'/><br/>
                        <label className='lables'>Email:</label>
                        <input type={"text"} placeholder="Enter your email" className='form-control'/><br/>
                        <label className='lables'>Username:</label>
                        <input type={"text"} placeholder="Enter your Username" className='form-control'/><br/>
                        <label className='lables'>Phone No.:</label>
                        <input type={"text"} placeholder="Enter your contact" className='form-control'/><br/>
                        <label className='lables'>Password:</label>
                        <input type={"text"} placeholder="Enter your password" className='form-control'/><br/>
                        <div className='text-center'>
                            <button className='btn btn-primary w-50'>Submit</button>
                        </div>
                       
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default userRegistartion