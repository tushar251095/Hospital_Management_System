/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
export const doctorLandingPage = () => {
  return (
    <div>
    Hello {localStorage.getItem('name')}
    <p>Role:  {localStorage.getItem('role')}</p>
</div>
  )
}
export default doctorLandingPage