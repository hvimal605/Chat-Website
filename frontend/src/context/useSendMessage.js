import React, { useState } from 'react';
import useConversation from '../zustand/useConversation'; 
import axios from 'axios';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessage, selectedConversation } = useConversation(); // Destructure correctly
    
    const sendMessages = async (messageContent) => {
        setLoading(true);

        try {
            const res = await axios.post(`/api/message/send/${selectedConversation._id}`, {
                message: messageContent
            });

            const newMessage = res.data.newMessage; // Extract the newMessage object from the response

            // Update messages state with the new message
            setMessage([...messages, newMessage]);
            setLoading(false);
        } catch (error) {
            console.log("Error in sending message", error);
            setLoading(false);
        }
    };

    return { loading, sendMessages };
};

export default useSendMessage;
