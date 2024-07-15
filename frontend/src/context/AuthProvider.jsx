import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Create Auth Context
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    // Initial user state from cookies or local storage
    const initialUserState = Cookies.get("harshcookie") || localStorage.getItem("ChatApp");
    
    // Parse the user data and store in state
    const [authUser, setAuthUser] = useState(initialUserState ? JSON.parse(initialUserState) : undefined);

    // Sync authUser to cookies and local storage whenever it changes
    useEffect(() => {
        if (authUser) {
            const userData = JSON.stringify(authUser);
            Cookies.set("harshcookie", userData);
            localStorage.setItem("ChatApp", userData);
        } else {
            Cookies.remove("harshcookie");
            localStorage.removeItem("ChatApp");
        }
    }, [authUser]);

    return (
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);