/* eslint-disable no-undef */
import React from 'react'
import DatePicker from "react-datepicker";
import '../../assets/CSS/common.css'
import "react-datepicker/dist/react-datepicker.css";
import { useState,useEffect } from 'react';
import setHours from "date-fns/setHours";
import axios from '../../services/doctorService'
import patientaxios from '../../services/patientService'
import setMinutes from "date-fns/setMinutes";
import { useNavigate } from 'react-router-dom';
export const BookAppointment = () => {
    const navigate=useNavigate();
    const [discription, setdiscription] = useState('');
    const [endDate, setEndDate] = useState(new Date());
    const [selectedAppointment, setselectedAppointment] = useState(new Date());
    const [slotTime, setslotTime] = useState(5);
    const [days, setdays] = useState([]);
    const [startTimeMin, setstartTimeMin] = useState(0);
    const [startTimeHrs, setstartTimeHrs] = useState(0);
    const [endTimeMins, setendTimeMins] = useState(0);
    const [endTimeHrs, setendTimeHrs] = useState(0);
    const [bookedAppointment, setbookedAppointment] = useState([]);
    const isWorkingDay = (date) => {
        const day = date.getDay();
        return days.includes(day);
      };
      const bookedTimeslots=(time)=>{
         return !bookedAppointment.includes(time.getTime())
      }
      useEffect(() => {
        axios.get('/schedule/'+localStorage.getItem('doctorId'))
        .then(res=>{
            //console.log(res.data[1].booked)
            setbookedAppointment(res.data[1].booked)
            setdays(res.data[0].schedule[0].days)
            setslotTime(res.data[0].schedule[0].slot)
            setEndDate(new Date(res.data[0].schedule[0].endDate))
            const startTimeArr=res.data[0].schedule[0].startTime.split(":")
            const endTimeArr=res.data[0].schedule[0].endTime.split(":")
            setstartTimeMin(startTimeArr[1])
            setstartTimeHrs(startTimeArr[0])
            setendTimeHrs(endTimeArr[0])
            setendTimeMins(endTimeArr[1])
            //console.log(slotTime)
        })
        .catch(error=>{

            console.log(error)
        })
    },[]);
    const bookAppointment=(e)=>{
        e.preventDefault();
        let obj={
            doctorId:localStorage.getItem('doctorId'),
            appointmentTimestamp:parseInt(selectedAppointment.getTime()),
            discription:discription
        }

        patientaxios.post('/book/appoitnment',obj)
        .then(res=>{
            navigate('/user/patient')
        })
        .catch(error=>{
            console.log(error)
        })
        //console.log(obj)
    }
  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-sm-12'>
                <h3 className='text-center mt-3'>Book an Appointment</h3>
            </div>
        </div>
        <div className='row justify-content-center p-3'>
            <div className='col-sm-6'>
            <DatePicker
                    selected={selectedAppointment}
                    onChange={(date) => setselectedAppointment(date)}
                    minDate={new Date()}
                    showDisabledMonthNavigation
                    shouldCloseOnSelect={true}
                    maxDate={endDate}
                    className='form-control'
                    showTimeSelect
                    filterDate={(date) => isWorkingDay(date)}
                    filterTime={(time)=>bookedTimeslots(time)}
                    timeIntervals={slotTime}
                    timeCaption="Slots"
                    minTime={setHours(setMinutes(new Date(), startTimeMin), startTimeHrs)}
                    maxTime={setHours(setMinutes(new Date(), endTimeMins), endTimeHrs)}
                    dateFormat="MMMM d, yyyy h:mm aa"
                /><br/><br/>
                <label className='lables'>Description about disease:</label>
                <textarea className='form-control' value={discription} onChange={(e)=>setdiscription(e.target.value)}></textarea>
                <div className='text-center mt-3'>
                    <button className='btn btn-primary' onClick={(e)=>bookAppointment(e)}>Book Appointment</button>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default BookAppointment