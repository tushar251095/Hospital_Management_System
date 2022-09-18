import React from 'react'
const mainHeader={
    main:{
        backgroundColor:'#BDC9EA',
        position:'fixed',
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
        fontWeight:'600'
      }
}
const Header=()=>{
    return(
        <div className='container-fluid g-0' style={mainHeader.main}>
            <div className='row g-0'>
                <div className='col-sm-6'>
                    <img className='mt-3 ms-5 mb-2 float-start' src="Images/logo.png" alt='logo' height='90' width='80' />
                    <h2 className='mt-5'>&nbsp;Healthcare Management</h2>
                </div>
                <div className='col-sm-6'>
                    <ul class="list-group list-group-horizontal mt-5 float-end" >
                        <li class="list-group-item" style={mainHeader.listgroupitem}>
                            Sign up
                        </li>
                        <li class="list-group-item" style={mainHeader.listgroupitem}>
                            Login
                        </li>
                        <li class="list-group-item" style={mainHeader.listgroupitem}>
                            Appointment
                        </li>
                     </ul>
                </div>
            </div>
        </div>
    )
}

export default Header