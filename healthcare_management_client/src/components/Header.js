import React from 'react'
import { Link } from "react-router-dom";
import '../assets/CSS/common.css'
const mainHeader={
    main:{
        backgroundColor:'#BDC9EA',
        // position:'fixed',
        zIndex:'999',
        top:"0"
    },
    title:{
        fontFamily:'sans-serif'
    },
    headernav:{
        backgroundColor:'#BDC9EA'
    },
    listgroupitem:{
        backgroundColor: 'transparent',
        border: 'none',
        fontSize:'20px',
        fontWeight:'400'
      },
      brandName:{
        marginTop:"150px"
      }
}
const Header=()=>{
    return(
        <div className='container-fluid g-0' style={mainHeader.main}>
            <div className='row g-0'>
                <div className="col-sm-5 logo">
                    <Link to={"/"}>
                    <img src="Images/logo.png" className="float-start ms-4 mt-2 linkTag" alt="logo" height='70' width='60'/>
                    </Link>
                    <Link to={"/"}>
                    <h4 className="mt-4 pt-1 linkTag">&nbsp;Healthcare Management</h4>
                    </Link>

                   
                   
         
                </div>
                {/* <div className='col-sm-6'>
                    <img className='mt-3 ms-5 mb-2 float-start' src="Images/logo.png" alt='logo' height='70' width='60' />
                    <h3 className='mainHeader.brandName'>&nbsp;Healthy Life</h3>
                </div> */}
                <div className='col-sm-7'>
                    <ul className="list-group list-group-horizontal mt-5 float-end" >
                        <li className="list-group-item" style={mainHeader.listgroupitem}>
                            <Link to="/user/registartion" className='linkTag'>Sign up</Link>
                        </li>
                        <li className="list-group-item" style={mainHeader.listgroupitem}>
                            Login
                        </li>
                     </ul>
                </div>
            </div>
        </div>
    )
}

export default Header