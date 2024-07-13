import React from 'react';
import User from './User';
import useGetAllUsers from '../../context/useGetAllUsers';

const Users = ({onSelect}) => {
    const [allUsers, loading] = useGetAllUsers();

    return (
        <div className='container  p-4 '>
            <h1 className=' bg-sky-300 rounded-lg p-2 mb-2 font-semibold text-lg text-center'>
                Messages
            </h1>
            <div className='overflow-y-scroll max-h-[58vh] md:max-h-[65vh] flex-1'>
                {
                    allUsers.map((user, index) => (
                        <User key={index} user={user} onSelect={onSelect} />
                    ))
                }
            </div>
        </div>
    );
}

export default Users;
