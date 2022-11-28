import React, { useEffect, useState } from 'react'
import axios from '../../services/axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ViewAdmitRequest = (props) => {
const [rqeuestDetails,setRequestDetails]= useState([
    {
        doctordetails:{firstName:"",lastName:""},
        patientDetails:{firstName:"",lastName:""},
        appointmentDetails:{comment:"",prescription:""}
    }
])
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const [roomData,setRoomData]=useState([])
const [roomType,setRoomType]=useState("ICU Rooms")
const getFacilityDetails=()=>{
    axios.post('/get/specific/type/speciality',{type:"room"})
    .then(result=>{
        setRoomData(result.data)
    })
}
const [admitData,setAdmitData]=useState( {
    doctordetails:{firstName:"",lastName:""},
    patientDetails:{firstName:"",lastName:""},
    appointmentDetails:{comment:"",prescription:""}
})
const viewAdmitForm=(e,data)=>{
    e.preventDefault()
    setAdmitData(data)
    getFacilityDetails()
    handleShow()
}

const saveAdmitDetails=(id)=>{
    let obj={
        name:roomType,
        id:id
    }
    axios.post('/save/admit/request',obj)
    .then(result=>{
        toast.success(result.data)
        getRequestDetails();
        handleClose()
    })
    .catch(err=>{
        console.log(err)
        toast.error(err)
    })
    console.log(obj)
}
useEffect(()=>{
    getRequestDetails();
},[])
const getRequestDetails=()=>{
    axios.post('/get/admit',{status:'pending'})
    .then(result=>{
       
        setRequestDetails(result.data)
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
         <Modal {...props} size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
                <h4>Patient Details</h4>
                
    
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-sm-12'>
                <table className='table table-bordered table-striped'>
                    <tbody>
                        <tr>
                            <th>
                                Patient Name
                            </th>
                            <td>
                                {admitData.patientDetails.firstName+" "+admitData.patientDetails.lastName}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Doctor Name
                            </th>
                            <td>
                                {admitData.doctordetails.firstName+" "+admitData.doctordetails.lastName}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Doctor's Comments
                            </th>
                            <td>
                                {admitData.appointmentDetails.comment}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Prescription
                            </th>
                            <td>
                                {admitData.appointmentDetails.prescription}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Room Type
                            </th>
                            <td>
                                <select className='form-control' value={roomType} onChange={(e)=>{
                                    setRoomType(e.target.value)
                                }}>
                                    <option disabled>
                                        select Room Type
                                    </option>
                                    {
                                        roomData.map((room,index)=>{
                                           return <option key={index} value={room.name}>
                                                {
                                                    room.name
                                                }
                                            </option>
                                        })
                                    }
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
            

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>          
          <Button variant="primary" onClick={()=>{saveAdmitDetails(admitData._id)}}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
 
        <div className='row mt-3'>
            <div className='col-sm-12'>
                <h3 className='text-dark text-center'>Admit Requests</h3>
            </div>
        </div>
        <div className='row mt-3'>
            <div className='col-sm-12'>
                <table  className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Doctor Name</th>
                            <th>Request Date</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            rqeuestDetails.map((details,index)=>{
                                return <tr key={index}>
                                    <td>{details.patientDetails.firstName+" "+details.patientDetails.lastName}</td>
                                    <td>{details.doctordetails.firstName+" "+details.doctordetails.lastName}</td>
                                    <td>{new Date(details.updatedAt).toLocaleTimeString()}</td>
                                    <td>
                                        <button className='btn btn-primary btn-sm' onClick={(e)=>{viewAdmitForm(e,details)}}>View admit form</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default ViewAdmitRequest;