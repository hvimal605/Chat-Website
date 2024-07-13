import React from 'react'
import Logout from '../leftpart/Logout'
import { useAuth } from '../../context/AuthProvider';
import { BiMenu } from "react-icons/bi";
import {Link} from 'react-router-dom'
import logo from '../../assets/Logo.png'

const Navbar = () => {
    const [authUser] = useAuth();
  return (
    <div className=' bg-white h-[10vh] rounded-sm flex shadow-md relative'>
        <div className=' w-[60%] sm:w-[50%]'>
          <img src={logo} alt=""
          className='h-[10vh] ml-6 sm:w-64  ' />
        </div>
        <div className=' w-[50%]  flex justify-end  items-center'>
        <div><Logout/></div>
        <div className=' border-2 border-gray-200 flex items-center p-1 mr-2 rounded-md gap-1'>
            <div className=' ' >
                <img  className='w-12 h-12 bg-red-600 rounded-full '
                src={authUser.image} alt="" />
                
            </div>
            <div>
           <Link to='/MyProfile/MainProfile' ><BiMenu  className=' text-2xl mr-2' /></Link> 
            </div>
            </div>
            
        </div>
         <div className=' bg-green-400 w-3 h-3 rounded-full absolute top-14 right-12'></div>
         
    </div>
  )
}

export default Navbar