import React from 'react';
import { FiEdit } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

const MainProfile = () => {
    const [authUser] = useAuth();
    return (
        <div className='w-full max-w-[90vw] md:max-w-[50vw] bg-white h-auto md:h-[60vh] rounded-2xl relative p-4 md:p-8 mx-auto'>
            <div className='h-[70px]'></div>
            <div className='text-4xl md:text-7xl font-semibold ml-4 md:ml-28'>Profile</div>
            <div className='h-auto md:h-[30vh] w-full mt-8 md:mt-[8vh] flex flex-col md:flex-row justify-around items-center md:items-start gap-8'>
                
                <div className='w-full md:w-[50%]'>
                    <div>
                        <div className='text-lg md:text-xl font-bold'>FullName</div>
                        <div className='flex items-center gap-2 mt-2'>
                            <div className='flex border-b-2 border-black font-semibold text-gray-500 w-full'>{authUser.fullname}</div>
                            <Link to='/MyProfile/Setting'>
                                <FiEdit className='text-lg md:text-2xl bg-yellow-100 p-1 rounded-md'/>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className='text-lg md:text-xl font-bold mt-5'>Bio</div>
                        <div className='flex items-center gap-2 mt-2'>
                            <div className='border-b-2 border-black font-semibold text-gray-500 w-full'>{authUser.bio}</div>
                            <Link to='/MyProfile/Setting'>
                                <FiEdit className='text-lg md:text-2xl bg-yellow-100 p-1 rounded-md'/>
                            </Link>
                        </div>
                    </div>
                </div>
                
                <div className='w-full md:w-[45%]'>
                    <div>
                        <div className='text-lg md:text-xl font-bold'>DOB</div>
                        <div className='flex items-center gap-2 mt-2'>
                            <div className='border-b-2 border-black font-semibold text-gray-500 w-full'>{authUser.dateOfBirth}</div>
                            <Link to='/MyProfile/Setting'>
                                <FiEdit className='text-lg md:text-2xl bg-yellow-100 p-1 rounded-md'/>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className='text-lg md:text-xl font-bold mt-5'>Email</div>
                        <div className='flex items-center gap-2 mt-2'>
                            <div className='border-b-2 border-black font-semibold text-gray-500 w-full'>{authUser.email}</div>
                            <Link to='/MyProfile/Setting'>
                                <FiEdit className='text-lg md:text-2xl bg-yellow-100 p-1 rounded-md'/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[120px] md:w-[230px] h-[120px] md:h-[230px] aspect-auto object-cover absolute top-5 md:top-7 right-5 md:right-20 rounded-full hover:scale-105 duration-200'>
                <img src={authUser.image} className='rounded-full object-cover w-full h-full' alt="Profile" />
            </div>
            <div className='absolute top-32  md:top-56 right-10 md:right-28'>
                <Link to='/MyProfile/Setting'>
                    <FiEdit className='text-lg md:text-2xl bg-yellow-100 p-1 rounded-md'/>
                </Link>
            </div>
        </div>
    );
}

export default MainProfile;
