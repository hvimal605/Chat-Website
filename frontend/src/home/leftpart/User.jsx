import React from 'react';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';

const User = ({ user,onSelect }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const {socket , onlineUsers} = useSocketContext()
  const isOnline = onlineUsers?.includes(user._id)
  // Check if the current user is selected
  const isSelected = selectedConversation?._id === user._id;

  // Function to handle click event and update selected conversation
  const handleClick = () => {
    setSelectedConversation(user); // Update selected conversation with user object
    onSelect()
  };

  return (
    <div
      onClick={handleClick}
      className={`flex gap-5 p-2 mt-3 sm:ml-2  hover:bg-violet-300 rounded-md duration-200 cursor-pointer relative ${isSelected ? 'bg-violet-300' : ''}`}
    >
      <div className={`rounded-full bg-white w-12 h-12  `}>
        <img
          src={user.image}
          alt=""
          className='rounded-full '
        />
      </div>
    
      <div>
        <h1 className='font-bold'>{user.fullname}
          {/* {
             isOnline?(<span className=' ml-16 text-green-600'>online</span>):(<span className=' ml-16 text-red-600'>offline</span>)
          } */}
          
        
        </h1>
         
        <span>{user.email}</span>
         {
             isOnline?(<span className='rounded-full left-12 top-3 h-3 w-3 bg-green-400   absolute'></span>):(<span className=' rounded-full left-12 top-3 h-3 w-3 bg-red-600 absolute '></span>)
          }
       
      </div>
    </div>
  );
};

export default User;
