import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
        <Outlet />
    </div>
  )
}

export default Layout