import React from 'react';

const Message = (props) => {
  const message = props.message;
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser._id;

  const chatName = itsMe ? 'justify-end' : 'justify-start';
  const chatbgColor = itsMe ? "bg-purple-400" : 'bg-pink-300';
  const chatColor = itsMe ? "text-white" : 'text-black';
  const border = itsMe ? "rounded-tl-xl  rounded-tr-xl rounded-bl-xl" : 'rounded-br-xl rounded-tl-xl  rounded-tr-xl';

  const createdAt = new Date(message.createdAt);
  const formattedDate = createdAt.toLocaleDateString([], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return (
    <div>
      <div className={`flex ml-4 md:ml-20 mr-4 md:mr-20 ${chatName}`}>
        <div className={`flex-col text-xl p-2 mt-4 max-w-[80%]   font-serif shadow-xl ${chatbgColor} ${chatColor} ${border}`}>
          {message.message}
        </div>
      </div>
      <div className={`${chatName} flex ml-4 md:ml-20 mr-4 md:mr-20 group`}>
        <span className='text-[10px] text-black'>
          {formattedTime} <span className='hidden duration-500 group-hover:inline'>{formattedDate}</span>
        </span>
      </div>
    </div>
  );
}

export default Message;
