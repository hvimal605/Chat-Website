import React, { useEffect } from 'react';
import Chatuser from './Chatuser';
import Messages from './Messages';
import Typesend from './Typesend';
import useConversation from '../../zustand/useConversation';
import NotAnySelect from '../../components/NotAnySelect';

const Right = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // Cleanup function to reset selectedConversation when unmounting or updating
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className='w-[100%] md:w-[73%]'>
      {!selectedConversation ? (
        <NotAnySelect />
      ) : (
        <div className='text-gray-900 shadow-md h-[87vh] md:h-auto m-4 rounded-md bg-white overflow-hidden'>
          {/* Use 'overflow-hidden' to prevent content overflow */}
          <Chatuser />
          <Messages />
          <Typesend />
        </div>
      )}
    </div>
  );
};

export default Right;
