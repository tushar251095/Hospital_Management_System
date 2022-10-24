import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../services/axios'
export const Specialities = () => {
    const navigate=useNavigate();
    const [specialities,setSpecialities] = useState([])
    useEffect(() => {
        axios.get('/get/specialities')
        .then((result)=>{
            setSpecialities(result.data)
            //console.log(result.data)
        })
      },[]);

      const onClickCard=(id)=>{
        localStorage.setItem('specId',id)
        navigate('/user/patient/doctorlist');
      }
  return (
    <div className='container-fluid'> 
        <div className='row g-0 mt-3'>
            <div className='col-sm-12'>
                <h3 className='text-center'>Doctor Specialities</h3>
            </div>
        </div>
        <div className='row g-0 mt-3 p-5'>
            {specialities.map(speciality => {
                return <div key={speciality.specId} className="col-sm-12 col-md-4 col-lg-3 p-2" >
                    <div className='card' style={{cursor:"pointer"}}  onClick={()=>onClickCard(speciality.specId)}>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <img src={speciality.imageUrl} height='80' width='80' alt='speciality' className='float-start rounded'/>
                            </div>
                            <div className='col-sm-8'>
                                <h4 className='mt-4'>{speciality.specName}</h4>
                            </div>
                        </div>
                    </div>
                </div>
        }
        )}
        </div>
       
    </div>
  )
}

export default Specialities