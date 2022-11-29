/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect,useState} from 'react'
import axios from '../../services/axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const GetDoctors = (props) => {
    const [docList,setDocList]=useState([
        {
            schedule:{}
        }
    ])
    
    const [Schedule, setSchedule] = useState({
        days:[],

    });
    const [isEdit, setisEdit]=useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [specialities,setSpecialities] = useState([])
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [specId,setspecId]=useState("");
    const [gender, setGender] = useState("Male");
    const [doctorId,setDoctorId]=useState("")
    const weekday=["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"]
    useEffect(()=>{
        getDoctList()
    },[])
    const getSpecialities =()=>{
        axios.get('/get/specialities')
        .then((result)=>{
            setSpecialities(result.data)
            //console.log(result.data)
        })
    }
    const getDoctList=()=>{
        axios.get('/get/doctors')
        .then((result)=>{
            setDocList(result.data)
        })
    }
    const viewSchedule=(doc)=>{
        setisEdit(false)
        if(doc!=null || doc.length>0){
            setSchedule(doc[0])
            handleShow()
        }
    }
    const deleteDoctor=(e,email)=>{
        e.preventDefault()
        if(window.confirm("Are you sure you want to delete the doctor?")){
            axios.delete('/delete/doctor/'+email)
            .then(result=>{
                if(result.data){
                    toast.success("Doctor Successfully Removed from system")
                    getDoctList()
                }else{
                    toast.error("Something went wrong")
                }
            })
            .catch(err=>{
                toast.success("Something went wrong")
                console.log(err)
            })
        }
           
    }
    const EditDetails=(e,doc)=>{
        e.preventDefault()
        getSpecialities()
        setfirstName(doc.firstName)
        setlastName(doc.lastName)
        setEmail(doc.email)
        setContact(doc.contact)
        setspecId(doc.specId)
        setGender(doc.gender)
        setisEdit(true)
        setDoctorId(doc.doctorId)
        handleShow()
    }
    const SaveEditDetails=(e)=>{
        e.preventDefault()
        let obj={
            doctorId:doctorId,
            firstName:firstName,
            lastName:lastName,
            email:email,
            contact:contact,
            specId:specId,
            gender:gender,
            role:"doctor"
        }
        axios.post('/edit/profile',obj)
        .then((result)=>{
            console.log(result)
            if(result.data){
                toast.success("Successfully Edited")
                getDoctList()
                handleClose()
            }else{
                toast.error("something went wrong")
                handleClose()
            }
        })
    }
  return (
    <div className='containter-fluid'>
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
                <h4>Doctor Details</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                
                Schedule!==undefined &&  !isEdit &&
                <div>
                <table className='table table-bordered table-striped'>
                    <tbody>
                        <tr>
                            <th>Start Time:</th>
                            <td>{Schedule.startTime}</td>
                        </tr>
                        <tr>
                            <th>End Time:</th>
                            <td>{Schedule.endTime}</td>
                        </tr>
                        <tr>
                            <th>Days of Week:</th>
                            <td>
                            {
                                Schedule.days.map((index,day)=>{
                                    return <span key={index}>
                                       { weekday[day+1]} &nbsp;| &nbsp;
                                    </span>
                                })
                            }
                            </td>
                           
                        </tr>
                        <tr>
                            <th>Last Date of schedule:</th>
                            <td>{Schedule.endDate}</td>
                        </tr>
                        <tr>
                            <th>Time per slot in min(s):</th>
                            <td>{Schedule.slot}</td>
                        </tr>
                    </tbody>
                </table>
           </div>
            }
          
            {
                Schedule===undefined && !isEdit && <h3 className='text-center text-secondary p-5'>Schedule Not Present</h3>
            }
            {
                isEdit && 
                <div>
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
                <input type={"text"} id="email" value={email} disabled onChange = {(e) => setEmail(e.target.value)} placeholder="Enter your email" className='form-control'/><br/>
                <label className='lables'>Phone No.:</label>
                <input type={"text"} id="contact" value={contact} onChange = {(e) => setContact(e.target.value)} placeholder="Enter your contact" className='form-control'/><br/>
                <label className='lables'>Specialization:</label>
                {/* <input type={"text"} id="specialization" value={specialization} onChange = {(e) => setSpecialization(e.target.value)} placeholder="Enter your contact" className='form-control'/><br/> */}
                <select value={specId} onChange={(e) => setspecId(e.target.value)} className="form-control">
                    {
                        specialities.map((spec,index)=>(
                            <option key={index} value={spec.specId}>{spec.specName}</option>    
                        ))
                    }
                </select>
                </div>
            }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {
            isEdit && <Button variant="primary" onClick={(e)=>SaveEditDetails(e)}>
            Edit
          </Button>
          }
          
        </Modal.Footer>
      </Modal>
        <div className='row mt-3 g-0'>
            <div className='col-sm-12'>
                <h3 className='text-center text-dark'>Doctors List</h3>
            </div>
        </div>
        <div className='row mt-3 g-0 p-3'>
            <div className='col-sm-12'>
                {
                    docList.length==0 &&
                    <div className="row border border-secondary mt-3">
              <div className="col-sm-12">
                <h3 className="text-secondary text-center p-5">
                   Doctor List is Empty
                </h3>
              </div>
            </div>
                }
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Specialization</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Actions</th>
                        </tr>
                       
                    </thead>
                    <tbody>
                        {
                            docList.map((doc,index)=>{
                               return <tr key={index}>
                                    <td>{doc.firstName+" "+doc.lastName}</td>
                                    <td>{doc.specialization}</td>
                                    <td>{doc.gender}</td>
                                    <td>{doc.email}</td>
                                    <td>{doc.contact}</td>
                                    <td>
                                        <button className='btn btn-primary btn-sm' onClick={()=>viewSchedule(doc.schedule)}>View Schedule</button>&nbsp;
                                        
                                        <button className='btn btn-secondary btn-sm' onClick={(e)=>EditDetails(e,doc)}>Edit Details</button>
                                       &nbsp; <button className='btn btn-danger btn-sm' onClick={(e)=>deleteDoctor(e,doc.email)}>Delete</button>
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

export default GetDoctors