import React, { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation'; // Ensure correct import path
import axios from 'axios';

const useGetMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessage, selectedConversation } = useConversation(); // Destructure correctly
    
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            if (selectedConversation && selectedConversation._id) {
                try {
                    const res = await axios.get(`/api/message/get/${selectedConversation._id}`); // Correct usage of selectedConversation._id
                    setMessage(res.data);
                    setLoading(false);
                } catch (error) {
                    console.log("Error in getting messages", error);
                    setLoading(false);
                }
            }
        };
        getMessages();
    }, [selectedConversation, setMessage]);

    return { loading, messages };
};

export default useGetMessage;
