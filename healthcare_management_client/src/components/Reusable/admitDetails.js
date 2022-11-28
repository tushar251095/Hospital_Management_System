import React, { useState } from 'react'

export const AdmitDetails = ({admitDetails}) => {
  const [roundDetails,setRoundDetails]=useState({})
  return (
    <div className='container-fluid'>
      <label><b>Admit Date:&nbsp;</b></label>
                   <label>{new Date(admitDetails.admitDate).toLocaleString()}</label><br/>
                   {
                      admitDetails.dischargeDate!=undefined && 
                      <div>
                        <label><b>Discharge Date:&nbsp;</b></label>
                   <label>{new Date(admitDetails.dischargeDate).toLocaleString()}</label>
                      </div>
                     
                   }
                   <label><b>Room Type:&nbsp;</b></label>
                   <label>{admitDetails.roomType}</label><br/>
                   <label><b>Room Number:&nbsp;</b></label>
                   <label>{admitDetails.roomNo}</label><br/>
                   
            {
                admitDetails.rounds==undefined && 
                <div className="row border border-secondary mt-3">
                <div className="col-sm-12">
                  <h3 className="text-secondary text-center p-5">
                    No Round Details Available
                  </h3>
                </div>
              </div>
            }
            {
                 admitDetails.rounds!=undefined && admitDetails.rounds.length>0 &&
                <div>
                    <table className='table table-bordered mt-3'>
                      <tbody>
                      <tr>
                            {
                                admitDetails.rounds.map((round,index)=>{
                                    return <td key={index} style={{cursor:'pointer'}} className="text-primary" onClick={()=>{setRoundDetails(round)}}>Round &nbsp; {index+1}</td>
                                })
                            }
                        </tr>
                      </tbody>
                       
                    </table>
                    <table className='table table-bordered mt-3'>
                      <tbody>
                      {
                          roundDetails.roundDate!=undefined &&
                          <tr>
                          <th>Round Date</th>
                          <td>{new Date(roundDetails.roundDate).toLocaleString()}</td>
                      </tr>
                        }
                        {
                          roundDetails.doctor!=undefined &&
                          <tr>
                          <th>Doctor Name</th>
                          <td>{roundDetails.doctor}</td>
                      </tr>
                        }
                        {
                          roundDetails.comment!=undefined &&
                          <tr>
                          <th>Comment</th>
                          <td>{roundDetails.comment}</td>
                      </tr>
                        }
                        {
                          roundDetails.prescription!=undefined &&
                          <tr>
                            <th>Prescription</th>
                            <td>{roundDetails.prescription}</td>
                        </tr>
                        }
                         {
                          roundDetails.height!=undefined &&
                          <tr>
                          <th>Height</th>
                          <td>{roundDetails.height}</td>
                      </tr>
                        }
                        {
                          roundDetails.weight!=undefined &&
                          <tr>
                          <th>Weight</th>
                          <td>{roundDetails.weight}</td>
                      </tr>
                        }
                       {
                          roundDetails.bloodPressure!=undefined &&
                          <tr>
                          <th>Blood Pressure</th>
                          <td>{roundDetails.bloodPressure}</td>
                      </tr>
                        }
                        {
                          roundDetails.sugarLevel!=undefined &&
                          <tr>
                          <th>Sugar Level</th>
                          <td>{roundDetails.sugarLevel}</td>
                      </tr>
                        }
                        
                      </tbody>
                       
                    </table>
                </div>
            }
    </div>
  )
}

export default AdmitDetails
