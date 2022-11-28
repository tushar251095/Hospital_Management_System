import React from 'react'
import { useEffect, useState } from 'react'
import axios from '../../services/doctorService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  useNavigate } from 'react-router-dom';

export const ViewAppointment = (props) => {
    const [height, setHeight]= useState("");
    const [weight, setWeight] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [sugarLevel, setSugarLevel] = useState("");
    const [bloodPressure, setBloodPressure] =useState("");
    const [fullName, setFullName]= useState("");
    const [age, setAge]= useState("");
    const [gender, setGender]= useState("");
    const [Appointments,setAppointment]=useState([])
    
    const [patientId, setpatientId] = useState(false);
    const [appId, setappId] = useState(false);
    const [comment,setComment] =useState("");
    const [prescription,setPrescription]= useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setHeight("")
        setWeight("")
        setBloodGroup("")
        setBloodPressure("")
        setPrescription("")
        setComment("")
        setSugarLevel("")
    }
    const handleShow = () => setShow(true);
    const navigate = useNavigate()
    useEffect(()=>{
        ViewAppointment("pending")
    },[])
    const sendAdmitRequest=(e)=>{
        updatePatientDeatils(e)
      
            let Obj={
                appId:appId,
                isAdmitted:'pending'
            }
            axios.put('/update/admitStatus',Obj)
            .then(result=>{
                if(result.data){
                    toast.success("Admit request send successfully")
                }else{
                    toast.error("Something went wrong")
                }
            })
            .catch(err=>{
                console.log(err)
            })
        
    }

    const ViewAppointment=(data)=>{
        axios.post('/view/appointments',{status:data})
        .then(res=>{
            setAppointment(res.data);
            //console.log(res.data)
        })
    }
    const getDetails=(e,id,appid)=>{
       e.preventDefault()
       setpatientId(id)
       setappId(appid)
       localStorage.setItem('patientId',id)
        axios.get("/get/patient/"+id)
        .then(res=>{
            setShow(true);
            setFullName(res.data.firstName+" "+res.data.lastName);
            setAge(res.data.age);
            setGender(res.data.gender);
            if(res.data.hasOwnProperty('height')){
                setHeight(res.data.height)
            }
            if(res.data.hasOwnProperty('weight')){
                setWeight(res.data.weight)
            }

            if(res.data.hasOwnProperty('sugarLevel')){
                setSugarLevel(res.data.sugarLevel)
            }

            if(res.data.hasOwnProperty('bloodGroup')){
                setBloodGroup(res.data.bloodGroup)
            }

            if(res.data.hasOwnProperty('bloodPressure')){
                setBloodPressure(res.data.bloodPressure)
            }
            //console.log(res.data)
        })
    }
    const cancelAppointment=(e,id)=>{
        e.preventDefault()
        axios.put('/appointment/cancel/'+id)
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

    const GoToHistory=(e)=>{
        navigate("/user/doctor/patient/history")
    }
     const updatePatientDeatils=(e)=>{
        e.preventDefault();
        let obj={
            height:height,
            weight:weight,
            bloodPressure:bloodPressure,
            bloodGroup:bloodGroup,
            sugarLevel:sugarLevel,
            patientId:patientId,
            appId:appId,
            comment:comment,
            prescription:prescription

        }
        axios.post('/update/patient/details',obj)
        .then((res)=>{
           if(res.data){
            handleClose()
           }
           ViewAppointment("pending")
        })
        console.log(obj)
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
        <Modal {...props} size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
                <h4>Patient Details</h4>
                
    
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            <div className='row'>
                <div className='col-sm-12'>
                    <div className='text-end'>
                        <button className='btn btn-primary btn-sm' onClick={(e)=>GoToHistory(e)}>View History</button>
                    </div> 
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-sm-12'>
                    <label className='lables'>Full Name: &nbsp;</label>
                    <span style={{fontSize:'18px'}}>
                        {fullName}
                    </span> <br/>
                    <label className='lables'>Age: &nbsp;</label>
                    <span style={{fontSize:'18px'}}>
                        {age}
                    </span> <br/>
                    <label className='lables'>Gender: &nbsp;</label>
                    <span style={{fontSize:'18px'}}>
                        {gender}
                    </span><br/>
                    <label className='lables'>Height: &nbsp;</label>
                    <input type={"text"} id="height" value={height} onChange = {(e) => setHeight(e.target.value)} placeholder="Enter patient's height" className='form-control'/><br/>
                    <label className='lables'>Weight: &nbsp;</label>
                    <input type={"text"} id="weight" value={weight} onChange = {(e) => setWeight(e.target.value)} placeholder="Enter patient's weight" className='form-control'/><br/>
                    <label className='lables'>Blood Pressure: &nbsp;</label>
                    <input type={"text"} id="bloodPressure" value={bloodPressure} onChange = {(e) => setBloodPressure(e.target.value)} placeholder="Enter patient's blood pressure" className='form-control'/><br/>
                    <label className='lables'>Sugar Level: &nbsp;</label>
                    <input type={"text"} id="sugarLevel" value={sugarLevel} onChange = {(e) => setSugarLevel(e.target.value)} placeholder="Enter patient's height" className='form-control'/><br/>
                    <label className='lables'>Blood Group: &nbsp;</label>
                    <input type={"text"} id="bloodGroup" value={bloodGroup} onChange = {(e) => setBloodGroup(e.target.value)} placeholder="Enter patient's height" className='form-control'/><br/>
                    <label className='lables'>Comment: &nbsp;</label>
                    <textarea value={comment} onChange = {(e) => setComment(e.target.value)} placeholder="Enter comments" className='form-control'/><br/>
                    <label className='lables'>Prescription: &nbsp;</label>
                    <textarea value={prescription} onChange = {(e) => setPrescription(e.target.value)} placeholder="Enter prescription" className='form-control'/><br/>
                </div>
            </div>
           

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>          
          <Button variant="warning" onClick={(e)=>sendAdmitRequest(e)}>
            Admit Request
          </Button>
          <Button variant="primary" onClick={(e)=>updatePatientDeatils(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    <div className='row g-0 mt-3'>
        <div className='col-sm-12'>
            <h3 className='text-center'>Appointments</h3>
        </div>
    </div>
    <div className='row'>
                <div className='col-sm-12'>
                    <div className='float-end'>
                        <button className='btn btn-secondary ms-2  btn-sm' onClick={()=>{ViewAppointment("attended")}}>Attended</button>
                        <button className='btn btn-info ms-2  btn-sm' onClick={()=>{ViewAppointment("pending")}}>Unattended</button>
                        <button className='btn btn-danger ms-2  btn-sm' onClick={()=>{ViewAppointment("cancelled")}}>Cancelled</button>
                    </div>
                </div>
            </div>
    <div className='row g-0 mt-3'>
        <div className='col-sm-12'>
            {
                Appointments.length!=0 && 
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
                           
                            <td>
                                {
                                    appointment.status=="pending" && 
                                    <div>
                                        <button className='btn btn-success btn-sm' onClick={(e)=>getDetails(e,appointment.patientId,appointment._id)}>Attend</button>&nbsp;
                                        <button className='btn btn-danger btn-sm' onClick={(e)=>cancelAppointment(e,appointment._id)}>Cancel</button>
                                    </div>  
                                }
                                {
                                     appointment.status=="attended" && 
                                     <p className='text-success'>Attended</p>
                                }
                                 {
                                     appointment.status=="cancelled" && 
                                     <p className='text-danger'>Cancelled</p>
                                }
                                
                            </td>
                        </tr>
                    }
                    )}
                </tbody>
                
            </table>
            }
            {
                Appointments.length==0 &&
                <div className='card border p-5'>
                     <h4 className='text-center text-secondary'>No appointment available</h4>
                </div>
            }
        </div>
    </div>

</div>
  )
}
export default ViewAppointment
