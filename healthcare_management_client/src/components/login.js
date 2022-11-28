/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react'
import axios from '../services/axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../utlis/AuthProvider';
import jwt_decode from "jwt-decode";
import '../assets/CSS/background.css'
export const login = () => {
    const [email, setEmail] =useState("");
    const [password, setPassword] =useState("");
    const navigate=useNavigate()
    const auth = useAuth()
    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "email"){
            setEmail(value);
        }
       
        if(id === "password"){
            setPassword(value);
        }

    }
    const handleSubmit  = (e) => {
        e.preventDefault();
        let obj = {
            email:email,
            password:password,
        }  
        axios.post('/login',obj)
        .then(res=>{
                auth.login(res.data.token)
                const decoded = jwt_decode(res.data.token);
                    if(decoded.role==='admin'){
                        navigate('/user/admin')
                    }else if(decoded.role==='patient'){
                        navigate('/user/patient')
                    }else{
                        navigate('/user/doctor')
                    }
                    toast.success("Login successfull")
                    window.location.reload()
        })
        .catch(error=>{
            console.log(error)
            toast.error(error.response.data.message)
        })
     }
  return (
        <div className='container-fluid maincontent'>
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
            <div className='row g-0 mt-4'>
                <div className='col-sm-12'>
                    <h3 className='text-center'>Login</h3>
                </div>
            </div>
            <div className='row g-0 justify-content-center pb-5 mt-3'>
                <div className='col-sm-5'>
                    <div className='card p-5'>
                        <label className='lables'>Username/Email: </label>
                        <input type="text" value={email} onChange = {(e) => handleInputChange(e)} id="email" placeholder='Username/Email' className='form-control'/>
                        <label className='lables'>Passowrd: </label>
                        <input type="password" value={password} id="password" onChange = {(e) => handleInputChange(e)} placeholder='Enter your password' className='form-control'/>
                        <div className='text-center mt-3'>
                            <button onClick={(e)=>handleSubmit(e)} tyep="submit" className='btn btn-primary w-50'>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default login
