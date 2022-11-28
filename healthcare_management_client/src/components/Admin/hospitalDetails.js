import Facility from "../Reusable/facility";
import React, { useEffect, useState } from "react";
import axios from '../../services/axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const HospitalDetails = () => {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [remCount, setremCount] = useState(0);
  const [status, setStatus] = useState("Available");
  const [type, setType] = useState("room");
  const AddDetails=(e)=>{
     e.preventDefault()
     if(name=="" || count==0 || remCount==0 || status==""){
        toast.error("Every field is mandatory")
     }else{
        let obj={
            name:name,
            count:count,
            remCount:remCount,
            status:status,
            type:type
         }
         axios.post('/update/hospital/details',obj)
         .then(result=>{
            if(result.data){
                toast.success("Facility Added successfully")
                window.location.reload();
            }else{
                toast.error("Something went wrong")
            }
         })
     }
    
     
  }
  return (
    <div className="container-fluid">
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
      <div className="row mt-3">
        <div className="col-sm-12">
          <h3 className="text-dark text-center ">Hospital Details</h3>
        </div>
      </div>
      <div className="row mt-3 justify-content-center p-3">
        <div className="col-sm-8 card p-3">
            <h4 className="text-center">Add Details</h4>
      
          <label>Name</label>
          <input
            type={"text"}
            placeholder="Add meaningful name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
          <label>Total Count</label>
          <input
            type={"number"}
            placeholder="Add Total quantity available"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="form-control"
          />
          <label>Remaining Count</label>
          <input
            type={"number"}
            placeholder="Add Remaining"
            value={remCount}
            onChange={(e) => setremCount(e.target.value)}
            className="form-control"
          />
          <label>Status</label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option disabled>Please select one</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
            <option value="Under-Maintainance">Under-Maintainance</option>
            <option value="Damaged">Damaged</option>
          </select>
          <label>Type</label>
          <select
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option disabled>Please select one</option>
            <option value="room">Room</option>
            <option value="equipment">Equipment</option>
          </select>
          <button className="btn btn-primary w-25 mt-3" onClick={(e)=>AddDetails(e)}>Submit</button>
        
        </div>
      </div>
      <div className='row'>
            <div className='col-sm-12'>
                <h3 className='text-dark text-center'>
                    Facility Details
                </h3>
            </div>
        </div>
        <div className='row'>
            <div className='col-sm-12'>
                <Facility/>
            </div>
        </div>
    </div>
  );
};

export default HospitalDetails;
