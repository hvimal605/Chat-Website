import React, { useState } from 'react';
import useConversation from '../../zustand/useConversation';
import { useSocketContext } from '../../context/SocketContext';
import Modal from '../../components/Modal';
import { useAuth } from '../../context/AuthProvider';





const Chatuser = () => {
  const { onlineUsers } = useSocketContext();
  const { selectedConversation } = useConversation();
  // console.log(selectedConversation, 'sdfghjbbbbbbbbbbbb');

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers?.includes(userId) ? "Online" : "Offline";
  }

  const onlineStatus = getOnlineUsersStatus(selectedConversation?._id);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  

  return (
    <div  className='flex h-[8vh] bg-cyan-200 p-2 relative rounded-md m-3 '
  >
      <div onClick={openModal} className='w-12  ml-16'>
        <img
          src={selectedConversation?.image}
          alt="user avatar"
          className='rounded-full bg-blue-500'
        />
      </div>
      <div  onClick={openModal}>
        <h1 className='font-bold text-xl ml-5'>{selectedConversation?.fullname}</h1>
        <div className=' flex ml-4 '>
          <div className={`${onlineStatus === "Online" ? 'bg-green-600' : 'bg-red-500'} h-2 w-2 mt-2 rounded-full mr-1 `}></div>
          <div className={`${onlineStatus === "Online" ? 'text-green-600' : 'text-red-500'} font-bold`}>
            {onlineStatus}
          </div>
        </div>
      </div>
     

      
      <Modal showModal={modalOpen} closeModal={closeModal} fullname={selectedConversation?.fullname}
        image={selectedConversation?.image} bio={selectedConversation?.bio} email={selectedConversation?.email}
        createdAt={selectedConversation?.createdAt} />

    </div>
  );
}

export default Chatuser;
