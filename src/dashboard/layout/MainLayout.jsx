// import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import Header from './Header'
// import AdminIndex from '../pages/AdminIndex'
const MainLayout = () => {
  return (
    <div className='min-w-screen min-h-screen bg-slate-100'>
      <Sidebar/>
      <div className='lg:ml-[250px] lg:w-[calc(100vw-268px)] min-h-[100vh] w-full'>
        <Header />
        <div className='p-4'>
          <div className='lg:pt-[85px] pt-0'>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout