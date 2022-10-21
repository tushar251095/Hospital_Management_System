/* eslint-disable no-undef */
import React, { useState} from 'react'
import '../../assets/CSS/common.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';

export const ManageSchedule = () => {
    const [endDate, setEndDate] = useState(new Date());
    const [startTime, setStartTime] = useState('10:00');
    const [endTime, setEndTime] = useState('10:00');
    const [days, setdays] = useState([]);
    const [slot, setSlot] = useState("5");
    const checkList = ["Sunday", "Monday", "Tuesday", "Wednesday","Thrusday","Friday","Saturday"];
    const handleCheck = (event) => {
        var updatedList = [...days];
        if (event.target.checked) {
          updatedList = [...days, event.target.value];
        } else {
          updatedList.splice(days.indexOf(event.target.value), 1);
        }
        setdays(updatedList);
      };

      const generateSchedule=(e)=>{
        e.preventDefault();
         let obj={
            endDate:endDate.toLocaleDateString(),
            startTime:startTime,
            endTime:endTime,
            days:days,
            slot:parseInt(slot)
         }
         console.log(obj)
      }
  return (
    <div className='container-fluid'>
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
                        <input value={item} type="checkbox" onChange={(e)=>handleCheck(e)} />
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