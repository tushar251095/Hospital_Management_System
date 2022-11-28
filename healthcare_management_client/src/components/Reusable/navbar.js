import { Link } from 'react-router-dom'
import { useAuth } from '../../utlis/AuthProvider';
import helper from '../../helper/helper'
const mainNav={
    main:{
        backgroundColor:'#7F93CB',
    }
}
const Navbar=()=>{
    const auth=useAuth()
    var imageBasePath = window.location.protocol + "//" + window.location.host + "/Images/avatar.png";
    return(
        <div className='container-fluid g-0' style={mainNav.main}>
            <div className='row g-0 p-1'>
                <div className='col-sm-10'>
                    <ul className="list-group list-group-horizontal" >
                        {
                            localStorage.getItem('token') && localStorage.getItem('role')=='patient' && 
                            <li className="list-group-item listgroupitem">
                            <Link className='linkTag' to="/user/patient/records">Records</Link>
                        </li>
                        }
                        {
                            localStorage.getItem('token') && (localStorage.getItem('role')=='doctor' || localStorage.getItem('role')=='admin') &&
                            <li className="list-group-item listgroupitem">
                            <Link className='linkTag' to="/user/doctor/search/patient">Search Patient</Link>
                        </li>
                        }
                        {
                            localStorage.getItem('token') && localStorage.getItem('role')=='admin' &&  <li className="list-group-item listgroupitem">
                            <Link to="/add/doctor" className="linkTag">Add Doctor</Link>
                         </li>
                        }
                           {
                            localStorage.getItem('token') && (localStorage.getItem('role')=='patient' || localStorage.getItem('role')=='doctor') &&
                            <li className="list-group-item listgroupitem">
                            <Link className='linkTag' to="/user/profile">Profile</Link>
                        </li>
                        }
                          
                     </ul>
                </div>
                {
                    localStorage.getItem('token') &&  
                    <span className='col-sm-2 flaot-end'>
                        <div className=''>
                            <img src={imageBasePath} height={40} width={40} alt={'avatar'} className='mt-1 float-start'/> 
                        </div> 
                        <div className=' '>
                            {
                                localStorage.getItem('role')=='admin' &&  <Link to="/user/admin"><p className='mt-2 text-light float-start'>&nbsp;Admin</p></Link>
                            }
                            {
                                localStorage.getItem('role')=='doctor' &&  <Link to="/user/doctor"><p className='mt-2 text-light float-start'>&nbsp;{helper.capitalName(localStorage.getItem('name').split(" ")[0])+" "+helper.capitalName(localStorage.getItem('name').split(" ")[1])}</p></Link>
                            }
                            {
                                localStorage.getItem('role')=='patient' &&  <Link to="/user/patient"><p className='mt-2 text-light float-start'>&nbsp;{helper.capitalName(localStorage.getItem('name').split(" ")[0])+" "+helper.capitalName(localStorage.getItem('name').split(" ")[1])}</p></Link>
                            }
                        </div>
                    </span>
                   
                }
               
                
            </div>
        </div>
    )
}

export default Navbar