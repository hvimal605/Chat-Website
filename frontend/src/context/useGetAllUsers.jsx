import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const useGetAllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const token = Cookies.get('harshcookie');
                console.log("Token:", token); // Check token in console
                const response = await axios.get('https://chat-website-isk6.onrender.com/api/user/allusers', {
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("Response Data:", response.data); // Check response data
                setAllUsers(response.data); // Assign only the data part of the response
                setLoading(false);
            } catch (error) {
                console.log("Error in useGetAllUsers:", error); // Log any errors
            } 
        };

        getUsers();
    }, []);

    return [allUsers, loading];
};

export default useGetAllUsers;