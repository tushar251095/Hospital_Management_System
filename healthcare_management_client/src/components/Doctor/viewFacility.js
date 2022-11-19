import React from 'react'
import Facility from '../Reusable/facility';
export const ViewFacility = () => {
  return (
    <div className='container-fluid'>
        <div className='row mt-3'>
            <div className='col-sm-12'>
                <h3 className='text-dark text-center'>
                    Facility Details
                </h3>
            </div>
        </div>
        <div className='row mt-3'>
            <div className='col-sm-12'>
                <Facility/>
            </div>
        </div>
    </div>
  )
}

export default ViewFacility;