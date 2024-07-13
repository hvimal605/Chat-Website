import React from 'react';
import SideNavbar from './SideNavbar';
import { Outlet } from 'react-router-dom';

const MyProfile = () => {
  return (
    <div className='flex flex-col md:flex-row justify-center h-screen items-center p-4 md:p-8'>
      <div className='flex flex-col md:flex-row rounded-3xl justify-center items-center gap-6 w-full'>
        <div className='w-full md:w-auto mb-4 md:mb-0'>
          <SideNavbar />
        </div>
        <div className='w-full md:w-[50vw] bg-white min-h-[60vh] rounded-2xl'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
