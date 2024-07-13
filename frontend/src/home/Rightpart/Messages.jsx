import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessage from '../../context/useGetMessage';
import Loading from '../../components/Loading';
import useGetSoketMessage from '../../context/useGetSoketMessage';
import { useSocketContext } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthProvider';

const Messages = () => {
    const [authUser] = useAuth();
    const { loading, messages } = useGetMessage();
    useGetSoketMessage();

    const { emitMessageSeenEvent } = useSocketContext();

    const lastMsgRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            if (lastMsgRef.current) {
                lastMsgRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }, [messages]);

    const handleSeen = (message) => {
        if (!message.seen && message.sender !== authUser._id) {
            emitMessageSeenEvent(message._id);
        }
    };

    return (
        <div className='overflow-y-auto flex-1'>
            {loading ? (
                <Loading />
            ) : (
                <div className='h-[64vh] md:h-[63vh]'>
                    {messages.length > 0 ? (
                        messages.map((message, index) => (
                            <div
                                key={message._id}
                                ref={index === messages.length - 1 ? lastMsgRef : null}
                                onLoad={() => handleSeen(message)}
                            >
                                <Message message={message} />
                            </div>
                        ))
                    ) : (
                        <div className=' flex flex-col items-center h-80 justify-center  '>
                            <p className='font-semibold text-xl text-center '>
                                Say hi to start the conversation <span className=' text-xl sm:text-2xl'>👋</span>
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Messages;
