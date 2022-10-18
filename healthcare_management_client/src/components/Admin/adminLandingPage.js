/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
export const adminLandingPage = () => {
  return (
    <div>
    Hello {localStorage.getItem('name')}
    <p>Role:  {localStorage.getItem('role')}</p>
</div>
  )
}

export default adminLandingPage
