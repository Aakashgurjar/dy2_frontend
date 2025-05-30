import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {


  return (
    <div>
       <Navbar />

       <main className='mt-10'>
          <Outlet />
       </main>
    </div>
  )
}

export default Layout