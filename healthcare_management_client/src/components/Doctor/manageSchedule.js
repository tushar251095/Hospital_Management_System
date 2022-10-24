/* eslint-disable no-undef */
import React, { useState} from 'react'
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
    const [slot, setSlot] = useState("5");
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
        <div className='row justify-content-center'>
            <div className='col-sm-6 card p-5'>
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
    </div>
  )
}

export default ManageSchedule

//https://reactdatepicker.com/#example-exclude-date-intervals