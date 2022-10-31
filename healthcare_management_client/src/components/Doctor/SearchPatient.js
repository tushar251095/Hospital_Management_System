import React from 'react'
import axios from '../../services/patientService'
import { useState } from 'react'
export const SearchPatient = () => {
  const [field,setField]=useState("firstName");
  const [query,setQuery]=useState("");
  const [list,setList]=useState([]);

  const getPatients=(e)=>{
    e.preventDefault();
    let obj={
      query:query,
      field:field
    }
    axios.post('/search',obj)
    .then((result)=>{
      setList(result.data)
      //console.log(result.data)
    })
    .catch(error=>{
      console.log(error)
    })
  }
  return (
    <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-sm-12'><h3 className='text-center'> Serach Patient</h3></div>
        </div>
        <div className='row mt-3'>
          <div className='col-sm-12'> 
              <label className='lables'>Select Field  to search</label>
              <select className='form-control w-25' value={field} onChange={(e)=>setField(e.target.value)}>
                  <option  className='form-control' value="firstName">First Name</option>
                  <option  className='form-control' value="lastName">Last Name</option>
              </select>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-sm-12'> 
              <div className="input-group">
                <div className="form-outline  w-25">
                  <input type={"search"} placeholder={"Search patient"} className='form-control' name="query" value={query} onChange={(e)=> setQuery(e.target.value)}/>
                </div>
                <button type="button" className="btn btn-primary" style={{width:"100px"}} onClick={(e)=>getPatients(e)}>
                    Search
                </button>
            </div>
          </div>
        </div>
        
        <div className='row mt-3'>
          <div className='col-sm-12'> 
              <table className='table table-bordered table-striped'>
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Patient Email</th>
                      <th>Patient Contact</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                     {
                        list.map((patient,index)=>(
                            <tr key={index}>
                                <td>{patient.firstName+" "+patient.lastName}</td>
                                <td>{patient.email}</td>
                                <td>{patient.contact}</td>
                                <td>
                                  <button className='btn btn-sm btn-primary'>Profile</button>&nbsp;
                                  <button className='btn btn-sm btn-secondary'>Records</button>
                                </td>
                            </tr>
                        ))
                     }
                  </tbody>
              </table>
          </div>
        </div>
    </div>
  )
}
export default SearchPatient
