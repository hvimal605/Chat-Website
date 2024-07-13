import React, { useState, useRef, useEffect } from 'react';
import { VscSend } from "react-icons/vsc";
import Picker from 'emoji-picker-react';
import { MdOutlineEmojiEmotions } from "react-icons/md";
import useSendMessage from '../../context/useSendMessage';
import { useSocketContext } from '../../context/SocketContext';
import useConversation from '../../zustand/useConversation';

const Typesend = () => {
    const { selectedConversation } = useConversation();
    const receiverId = selectedConversation?._id;

    const { socket, emitTypingEvent, typingUsers } = useSocketContext();
    const { loading, sendMessages } = useSendMessage();

    const [inputStr, setInputStr] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const inputRef = useRef(null);
    let typingTimeout = useRef(null);
    const TIMEOUT_DELAY = 1000;

    const handleTyping = () => {
        if (socket) {
            emitTypingEvent(receiverId, true);

            clearTimeout(typingTimeout.current);
            typingTimeout.current = setTimeout(() => {
                emitTypingEvent(receiverId, false);
            }, TIMEOUT_DELAY);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendMessages(inputStr.trim());
        setInputStr("");
    };

    const onEmojiClick = (emoji) => {
        setInputStr((prevInput) => prevInput + emoji.emoji);
        setShowPicker(false);
    };

    const togglePicker = () => {
        setShowPicker((val) => !val);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // Check if receiverId is typing
    const isReceiverTyping = typingUsers.includes(receiverId);

    return (
        <form onSubmit={handleSubmit} className="flex items-center justify-between bg-gray-100 rounded-xl m-2 mt-8 relative">
            <MdOutlineEmojiEmotions
                className='ml-4 md:ml-2 text-3xl text-sky-900 cursor-pointer'
                onClick={togglePicker}
            />
            {showPicker && (
                <div className="absolute bottom-[60px] md:top-auto left-0 right-0 md:left-10 z-10">
                    <Picker
                        onEmojiClick={onEmojiClick}
                        pickerStyle={{ width: '100%' }}
                    />
                </div>
            )}
            <input
                type="text"
                ref={inputRef}
                value={inputStr}
                onChange={(e) => {
                    setInputStr(e.target.value);
                    handleTyping();
                }}
                placeholder="Type your message..."
                className='p-2 mt-2 mb-2 w-full md:w-[61vw] ml-3 md:ml-0 rounded-lg bg-gray-200 text-xl'
            />
            <button type="submit" className="p-2 ml-2 md:ml-0">
                <VscSend className='sm:text-4xl text-2xl' />
            </button>
            {isReceiverTyping && (
                <div className="loadertyping sm:ml-12 ml-4 absolute bottom-16 "></div>
            )}
        </form>
    );
};

export default Typesend;
