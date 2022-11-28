/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../services/axios'
import '../assets/CSS/common.css'
import '../assets/CSS/registartion.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/CSS/background.css'
export const registrationForm = (props) => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("Male");
    var navigate=useNavigate();
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setfirstName(value);
        }
        if(id === "lastName"){
            setlastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "contact"){
            setContact(value);
        }
        if(id === "password"){
            setPassword(value);
        }

    }
    const handleSubmit  = (e) => {
       e.preventDefault();
        let obj = {
            firstName : firstName,
            lastName : lastName,
            email:email,
            contact:contact,
            password:password,
            age:age,
            gender:gender
        }   
        console.log(obj)  
        axios.post('/register',obj)
        .then(res=>{
            if(res){
                toast.success("Registration successfull")
               navigate('/user/login')
            }else{
                toast.error("Something went wrong please try again")
            }
            
        })
        .catch(error=>{
            console.log(error)
            if(error.response.data.statusCode==500){
                toast.error("email already in used.Please try with another one")
            }else{
                toast.error("Server side validation error: \n"+error.response.data.message)
            }
        })
    }

  return (
    <div className='main container-fluid g-0 signupContainer'> 
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
            <h3 className='text-center'>Registartion Form</h3>
        </div>
    </div>
    <div className='row g-0 pb-5'>
        <div className='col-sm-12 d-flex justify-content-center'>
            <div className='w-50 card p-5'>
                <label className='lables'>First Name:</label>
                <input type={"text"} id="firstName" value={firstName} onChange = {(e) => handleInputChange(e)} placeholder="Enter your first name" className='form-control'/><br/>
                <label className='lables'>Last Name:</label>
                <input type={"text"} id="lastName" value={lastName} onChange = {(e) => handleInputChange(e)} placeholder="Enter your last name" className='form-control'/><br/>
                <label className='lables'>Age:</label>
                <input type={"text"} id="age" value={age} onChange = {(e) => setAge(e.target.value)} placeholder="Enter your first name" className='form-control'/><br/>
                <label className='lables'>Gender:</label>
                <select className='form-control' value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select><br/>
                <label className='lables'>Email:</label>
                <input type={"text"} id="email" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Enter your email" className='form-control'/><br/>
                <label className='lables'>Phone No.:</label>
                <input type={"text"} id="contact" value={contact} onChange = {(e) => handleInputChange(e)} placeholder="Enter your contact" className='form-control'/><br/>
                <label className='lables'>Password:</label>
                <input type={"text"} id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Enter your password" className='form-control'/><br/>
                <div className='text-center'>
                    <button onClick={(e)=>handleSubmit(e)} tyep="submit" className='btn btn-primary w-50'>Submit</button>
                </div>
               
            </div>
        </div>
    </div>
</div>
  )
}
export default registrationForm