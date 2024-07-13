import React, { useState, useEffect } from 'react';
import { IoArrowBackSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoSettings } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';

const SideNavbar = () => {
    const location = useLocation();
    const [selected, setSelected] = useState(location.pathname);

    useEffect(() => {
        setSelected(location.pathname);
    }, [location.pathname]);

    const handleLinkClick = (path) => {
        setSelected(path);
    }

    return (
        <div className='bg-white sm:h-[55vh] sm:w-[6vw] h-[7vh] w-full rounded-full sm:flex-col flex justify-between items-center p-4 sm:p-11'>
            <Link to='/' onClick={() => handleLinkClick('/')}>
                <div className={`flex p-3 hover:bg-red-300 hover:scale-105 items-center gap-1 rounded-full ${selected === '/' ? 'bg-red-300' : ''}`}>
                    <IoArrowBackSharp className='text-2xl sm:text-5xl' aria-label="Back" />
                </div>
            </Link>

            <Link to='/MyProfile/MainProfile' onClick={() => handleLinkClick('/MyProfile/MainProfile')}>
                <div className={`flex p-3 hover:bg-red-300 hover:scale-105 items-center gap-1 rounded-full ${selected === '/MyProfile/MainProfile' ? 'bg-red-300' : ''}`}>
                    <CgProfile className='text-2xl sm:text-5xl' aria-label="Profile" />
                </div>
            </Link>

            <Link to='/MyProfile/Setting' onClick={() => handleLinkClick('/MyProfile/Setting')}>
                <div className={`flex p-3 hover:bg-red-300 hover:scale-105 items-center gap-1 rounded-full ${selected === '/MyProfile/Setting' ? 'bg-red-300' : ''}`}>
                    <IoSettings className='text-2xl sm:text-5xl' aria-label="Settings" />
                </div>
            </Link>

            <Link to='/MyProfile/DeleteAccount' onClick={() => handleLinkClick('/MyProfile/DeleteAccount')}>
                <div className={`flex p-3 hover:bg-red-300 hover:scale-105 items-center gap-1 rounded-full ${selected === '/MyProfile/DeleteAccount' ? 'bg-red-300' : ''}`}>
                    <MdDelete className='text-2xl sm:text-5xl' aria-label="Delete Account" />
                </div>
            </Link>
        </div>
    );
}

export default SideNavbar;
