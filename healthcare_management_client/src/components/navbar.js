import { Link } from 'react-router-dom'
import { useAuth } from './utlis/AuthProvider';
const mainNav={
    main:{
        backgroundColor:'#7F93CB',
    }
}
const Navbar=()=>{
    const auth=useAuth()
    console.log(auth.user)
    return(
        <div className='container-fluid g-0' style={mainNav.main}>
            <div className='row g-0'>
                <div className='col-sm-12'>
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
            </div>
        </div>
    )
}

export default Navbar