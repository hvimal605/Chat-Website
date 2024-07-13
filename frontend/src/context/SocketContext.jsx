import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from './AuthProvider';
import io from 'socket.io-client';

const socketContext = createContext();

export const useSocketContext = () => {
    return useContext(socketContext);
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [typingUsers, setTypingUsers] = useState([]);
    const [authUser] = useAuth(); 

    useEffect(() => {
        if (authUser) {
            const socket = io("https://chat-website-isk6.onrender.com", {
                query: {
                    userId: authUser._id,
                }
            });

            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            socket.on("typing", ({ senderId, isTyping }) => {
                if (isTyping) {
                    setTypingUsers((prevTypingUsers) => {
                        if (!prevTypingUsers.includes(senderId)) {
                            return [...prevTypingUsers, senderId];
                        }
                        return prevTypingUsers;
                    });
                } else {
                    setTypingUsers((prevTypingUsers) => {
                        return prevTypingUsers.filter((userId) => userId !== senderId);
                    });
                }
            });

            return () => socket.close();
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
        <socketContext.Provider value={{ socket, onlineUsers, typingUsers, emitTypingEvent, emitMessageSeenEvent }}>
            {children}
        </socketContext.Provider>
    );
}
