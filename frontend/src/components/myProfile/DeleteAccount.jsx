import React from 'react';
import { RiDeleteBinFill } from "react-icons/ri";
import { useAuth } from '../../context/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
  const [authUser] = useAuth();
  const authUserId = authUser._id;
  const navigate = useNavigate();

  async function handleDeleteAccount() {
    try {
      const response = await axios.post("/api/user/deleteAccount", { authUserId });

      if (response.data.success) {
        localStorage.removeItem("ChatApp");
        Cookies.remove("harshcookie");

        toast.success(response.data.message);
        navigate('/')  

        window.location.reload();
      } else {
        toast.error("Error: " + response.data.message);
      }
    } catch (error) {
      console.log("delete account Error", error);
      toast.error("Unable to Delete Account");
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-full p-4 md:p-8'>
      <div>
        <div className='text-3xl md:text-5xl font-bold'>Delete Account</div>
      </div>
      <div className='h-auto w-full md:w-[40vw] border-2 rounded-lg mt-10 bg-gray-100 p-4 md:p-6'>
        <div className='text-lg md:text-xl font-bold mb-4'>Delete Your Account</div>
        <div className='text-sm md:text-base mb-4'>
          Would you like to delete your account? Once you delete your account, you will lose all data associated with it.
        </div>
        <button
          type='button'
          onClick={handleDeleteAccount}
          className='w-full flex justify-center items-center gap-1 bg-red-100 p-2 rounded-md text-red-600 font-semibold border-2 hover:scale-105 duration-200 border-red-600'>
          <RiDeleteBinFill /> Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteAccount;
