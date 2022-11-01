/* eslint-disable no-undef */
import React, { useState, useEffect} from 'react'
import '../../assets/CSS/common.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import axios from '../../services/doctorService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
export const ManageSchedule = () => {
    const [endDate, setEndDate] = useState(new Date());
    const [startTime, setStartTime] = useState('10:00');
    const [endTime, setEndTime] = useState('10:00');
    const [days, setdays] = useState([]);
    const [displaydays, setdisplaydays] = useState([]);
    const [slot, setSlot] = useState("5");
    const [isAvailble, setisAvailble] = useState(false);
    const navigate=useNavigate();
    const checkList = ["Sunday", "Monday", "Tuesday", "Wednesday","Thrusday","Friday","Saturday"];
    const handleCheck = (event) => {
        var updatedList = [...days];
        if (event.target.checked) {
          updatedList = [...days, parseInt(event.target.value)];
        } else {
          updatedList.splice(days.indexOf(parseInt(event.target.value)), 1);
        }
        setdays(updatedList);
      };
      useEffect(() => {
        axios.get('/schedule/'+localStorage.getItem('id'))
        .then(res=>{
            //console.log(res.data[0].schedule.length)
            if(res.data[0].schedule.length===0){
                setisAvailble(false)
            }else{
                setisAvailble(true)
                setdisplaydays(res.data[0].schedule[0].days)
                setSlot(res.data[0].schedule[0].slot)
                setEndDate(new Date(res.data[0].schedule[0].endDate))
                const startTimeArr=res.data[0].schedule[0].startTime
                const endTimeArr=res.data[0].schedule[0].endTime
                setStartTime(startTimeArr)
                setEndTime(endTimeArr)
            }
        })
        .catch(error=>{

            console.log(error)
        })
    },[]);
      const generateSchedule=(e)=>{
        e.preventDefault();
         let obj={
            endDate:endDate,
            startTime:startTime,
            endTime:endTime,
            days:days,
            slot:parseInt(slot)
         }
         axios.post('/generate/schedule',obj)
        .then(res=>{
            if(res){
                toast.success("Schedule Generated successfull")
                navigate('/user/doctor')
            }else{
                toast.error("Something went wrong please try again")
            }
            
        })
        .catch(error=>{
            console.log(error)
                toast.error("Server side validation error: \n"+error.response.data.message)
        })
      }
  return (
    <div className='container-fluid'>
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
            <div className='row'>
            <div className='col-sm-12'>
                <h3 className='text-center mt-3'>Manage Schedule</h3>
            </div>
        </div>
            {
                !isAvailble && 
                <div className='row g-0 p-3'>
                    <div className='col-sm-12'>
                        <div className='card border border-secondary p-5'>
                            <h3 className='text-center text-secondary'>No Schedule present please generate one.</h3>
                            <div  className='text-center mt-3'>
                                <button className='btn btn-primary w-25' onClick={()=>setisAvailble(!isAvailble)}>Generate</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        {
             isAvailble && 
             <div className='row justify-content-center'>
             <div className='col-sm-6 card p-5'>
                <h4 className='text-center text-secondary'>Current Schedule</h4>
                <div className='mt-3'>
                    <table className='table table-bordered table-striped'>
                        <tbody>
                        <tr>
                            <th>Start Time</th>
                            <td>{startTime}</td>
                        </tr>
                        <tr>
                            <th>End Time</th>
                            <td>{endTime}</td>
                        </tr>
                        <tr>
                            <th>Per slot time:</th>
                            <td>{slot}</td>
                        </tr>
                        <tr>
                            <th>Days of week:</th>
                            <td> &nbsp;{
                                  displaydays.map((day,index)=>(
                                   
                                        <span key={index}>
                                            {
                                             day===0 &&
                                                <span>Sunday | </span>
                                            }
                                            {
                                             day===1 &&
                                                <span>Monday | </span>
                                            } 
                                            {
                                             day===2 &&
                                                <span>Tuesday | </span>
                                            } 
                                            {
                                             day===3 &&
                                                <span>Wednesday | </span>
                                            } 
                                            {
                                             day===4 &&
                                                <span>Thrusday | </span>
                                            } 
                                            {
                                             day===5 &&
                                                <span>Friday | </span>
                                            } 
                                            {
                                             day===6 &&
                                                <span>Saturday | </span>
                                            } 
                                            </span>
                                  ))
                                }</td>
                        </tr>
                        <tr>
                            <th>End Date:</th>
                            <td>{endDate.toLocaleDateString()}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
             </div>
            <div className='col-sm-6 card p-5'>
                <h4 className='text-center text-secondary'>Add/Change Schedule</h4>
                <label className='lables'>Start time: </label>
                <TimePicker onChange={(time) => setStartTime(time)} disableClock value={startTime} className='form-control'/><br/>
                <label className='lables'>End time: </label>
                <TimePicker onChange={(time) => setEndTime(time)} disableClock value={endTime} className='form-control'/><br/>
                <label className='lables'>Per slot time: </label>
                <input type={'number'} min='5' max='45' step="5" value={slot} className='form-control' onChange={(e) => setSlot(e.target.value)}/><br/>
                <label className='lables'>Days: </label>
                {checkList.map((item, index) => (
                    <span key={index}>
                        <input value={index} type="checkbox" onChange={(e)=>handleCheck(e)} />
                        <span>{item}</span>
                    </span>
                 ))}<br/>
                <label className='lables'>End Date: </label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={new Date()}
                    showDisabledMonthNavigation
                    className='form-control'
                /><br/>
                <button className='btn btn-primary w-50' onClick={(e) => generateSchedule(e)}>Generate</button>
            </div>
        </div>
        }
        
        
    </div>
  )
}

export default ManageSchedule

//https://reactdatepicker.com/#example-exclude-date-intervals