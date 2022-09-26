import React from 'react'
import { Link } from 'react-router-dom'
const mainNav={
    main:{
        backgroundColor:'#7F93CB',
    }
}
const Navbar=()=>{
    return(
        <div className='container-fluid g-0' style={mainNav.main}>
            <div className='row g-0'>
                <div className='col-sm-12'>
                    <ul className="list-group list-group-horizontal" >
                        <li className="list-group-item listgroupitem">
                            <Link className='linkTag'>Appointment</Link>
                        </li>
                        <li className="list-group-item listgroupitem">
                           <Link className='linkTag'>Book Ambulance</Link> 
                        </li>
                        <li className="list-group-item listgroupitem">
                        <Link className='linkTag'>Records</Link>
                        </li>
                     </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar