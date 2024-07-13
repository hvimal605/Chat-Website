// Modal.jsx

import React from 'react';
import { formatISODate } from '../../utils/TimeStampFormat.JS';
import { MdClose } from "react-icons/md";


const Modal = ({ showModal, closeModal ,fullname,image,bio,email,createdAt}) => {
   
  if (!showModal) return null;

  const handleClose = () => {
    closeModal();
  };

  const createdAtFormat = formatISODate(createdAt)
  
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-80 ">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          onClick={handleClose}
        >
          <MdClose className=' text-3xl' />
        </button>
        <div className=" flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold mb-3">{fullname}</h2>
          <img src={image} alt={`${fullname+' image'}`}
          className=' rounded-full w-[300px] p-5 '
          />
          <p className=' text-lg font-semibold'>{email}</p>
        
          <p className=' mt-2 text-orange-400  font-medium '>"{bio}"</p>
          <p className=' mt-2 text-sm'>Joined <span>{createdAtFormat}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
