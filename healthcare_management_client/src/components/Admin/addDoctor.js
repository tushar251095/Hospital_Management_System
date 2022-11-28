/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axios'
import '../../assets/CSS/background.css'
export const AddDoctor = () => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [specId,setspecId]=useState("");
    const [gender, setGender] = useState("Male");
    //const [specialization, setSpecialization] = useState("");
    const navigate=useNavigate()
    const [specialities,setSpecialities] = useState([])
    useEffect(() => {
        axios.get('/get/specialities')
        .then((result)=>{
            setSpecialities(result.data)
            //console.log(result.data)
        })
      },[]);
    //   const setValue=(value)=>{
    //             const arr=value.split(":");
    //             setspecId(arr[0]);
    //             setSpecialization(arr[1]);
    //   }
    const handleSubmit  = (e) => {
        e.preventDefault();
         let obj = {
             firstName : firstName,
             lastName : lastName,
             email:email,
             contact:contact,
            //  specialization:specialization,
             specId:specId,
             gender:gender
         }     
        // console.log(obj)
         axios.post('/doctor/register',obj)
         .then(res=>{
             if(res){
                  navigate('/user/admin')
                  toast.success("Registration successfull")
             }else{
                 toast.error("Something went wrong please try again")
             }
             
         })
         .catch(error=>{
             console.log(error)
             if(error.response.data.statusCode===500){
                 toast.error("email already in used.Please try with another one")
             }else{
                 toast.error("Server side validation error: \n"+error.response.data.message)
             }
         })
        
     }
  return (
    <div className='main container-fluid g-0 adddoctorContainer'> 
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
    <div className='row g-0 mt-5'>
        <div className='col-sm-12'>
            <h3 className='text-center'>Doctor Registartion Form</h3>
        </div>
    </div>
    <div className='row g-0 pb-5'>
        <div className='col-sm-12 d-flex justify-content-center'>
            <div className='w-50 card p-5'>
                <label className='lables'>First Name:</label>
                <input type={"text"} id="firstName" value={firstName} onChange = {(e) => setfirstName(e.target.value)} placeholder="Enter your first name" className='form-control'/><br/>
                <label className='lables'>Last Name:</label>
                <input type={"text"} id="lastName" value={lastName} onChange = {(e) => setlastName(e.target.value)} placeholder="Enter your last name" className='form-control'/><br/>
                <label className='lables'>Gender:</label>
                <select className='form-control' value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select><br/>
                <label className='lables'>Email:</label>
                <input type={"text"} id="email" value={email} onChange = {(e) => setEmail(e.target.value)} placeholder="Enter your email" className='form-control'/><br/>
                <label className='lables'>Phone No.:</label>
                <input type={"text"} id="contact" value={contact} onChange = {(e) => setContact(e.target.value)} placeholder="Enter your contact" className='form-control'/><br/>
                <label className='lables'>Specialization:</label>
                {/* <input type={"text"} id="specialization" value={specialization} onChange = {(e) => setSpecialization(e.target.value)} placeholder="Enter your contact" className='form-control'/><br/> */}
                <select value={specId} onChange={(e) => setspecId(e.target.value)} className="form-control">
                <option disabled>Select Specialization</option>
                    {
                        specialities.map((spec,index)=>(
                            <option key={index} value={spec.specId}>{spec.specName}</option>    
                        ))
                    }
                </select>
                <div className='text-center mt-3'>
                    <button onClick={(e)=>handleSubmit(e)} tyep="submit" className='btn btn-primary w-50'>Submit</button>
                </div>
               
            </div>
        </div>
    </div>
</div>
  )
}
export default AddDoctor