import React, { useState } from 'react';
import Search from './Search';
import Users from './Users';
import Logout from './Logout';
import { BiMenu } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";

const Left = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleUserSelect = () => {
    setIsOpen(false); 
  };

  return (
    <>
      <div className='hidden md:block w-[25%] m-3 bg-white rounded-lg'>
        <Search />
        <Users onSelect={handleUserSelect} /> {/* Pass onSelect prop */}
      </div>
      <div className='md:hidden absolute top-32 z-50 left-10'>
        <button onClick={handleToggle} className='p-2'>
          <FiExternalLink className='text-3xl' />Open
        </button>
        {isOpen && (
          <div className='fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white w-[90%] h-[90%] max-w-md rounded-lg p-4 shadow-lg overflow-y-auto transform transition-transform duration-300'>
              <button onClick={handleToggle} className='text-right text-xl mb-4'>
                &times;
              </button>
              <Search />
              <Users onSelect={handleUserSelect} /> 
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Left;
