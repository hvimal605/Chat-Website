import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from './AuthProvider';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [typingUsers, setTypingUsers] = useState([]);
    const { user: authUser } = useAuth(); 

    useEffect(() => {
        if (authUser) {
            const newSocket = io("https://chat-website-isk6.onrender.com", {
                query: {
                    userId: authUser._id,
                }
            });

            setSocket(newSocket);

            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            newSocket.on("typing", ({ senderId, isTyping }) => {
                setTypingUsers((prevTypingUsers) => {
                    if (isTyping) {
                        if (!prevTypingUsers.includes(senderId)) {
                            return [...prevTypingUsers, senderId];
                        }
                    } else {
                        return prevTypingUsers.filter((userId) => userId !== senderId);
                    }
                    return prevTypingUsers;
                });
            });

            return () => newSocket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    const emitTypingEvent = (receiverId, isTyping) => {
        if (socket) {
            socket.emit("typing", {
                senderId: authUser._id,
                receiverId,
                isTyping
            });
        }
    };

    const emitMessageSeenEvent = (senderId, messageId) => {
        if (socket) {
            socket.emit('messageSeen', {
                senderId,
                messageId
            });
        }
    };

    return (
        <SocketContext.Provider value={{ socket, onlineUsers, typingUsers, emitTypingEvent, emitMessageSeenEvent }}>
            {children}
        </SocketContext.Provider>
    );
}
