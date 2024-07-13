import React from 'react';
import { useAuth } from '../context/AuthProvider';
import WelcomeGif from '../assets/Welcome-GIF.gif'

const NotAnySelect = () => {
    const [authUser] = useAuth();
    // console.log(authUser,"---->,<")

    return (
        <div className="flex flex-col items-center justify-center h-[86vh] p-6 bg-white m-4 rounded-xl">
           
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-2'>Welcome</h1>
            <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue-400 uppercase gradient-text">{authUser.fullname}</span>
            <p className="text-sm md:text-base lg:text-lg mt-3 text-center">
                No chat selected. Please start a conversation by selecting someone from your contacts.
            </p>
        </div>
    );
};

export default NotAnySelect;
