import { Link } from 'react-router-dom'
import { useAuth } from '../../utlis/AuthProvider';
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
                        <li className="list-group-item listgroupitem">
                            <Link className='linkTag'>Appointment</Link>
                        </li>
                        <li className="list-group-item listgroupitem">
                        <Link className='linkTag'>Records</Link>
                        </li>
                        {
                            localStorage.getItem('token') && localStorage.getItem('role')=='admin' &&  <li className="list-group-item listgroupitem">
                            <Link to="/add/doctor" className="linkTag">Add Doctor</Link>
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
                                localStorage.getItem('role')=='doctor' &&  <Link to="/user/doctor"><p className='mt-2 text-light float-start'>&nbsp;{localStorage.getItem('name')}</p></Link>
                            }
                            {
                                localStorage.getItem('role')=='patient' &&  <Link to="/user/patient"><p className='mt-2 text-light float-start'>&nbsp;{localStorage.getItem('name')}</p></Link>
                            }
                        </div>
                    </span>
                   
                }
               
                
            </div>
        </div>
    )
}

export default Navbar