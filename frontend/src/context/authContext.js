import React, { useState, useEffect } from "react";
import axios from 'axios';

const AuthContext = React.createContext({
    isAdmin: false
});

export const AuthContextProvider = (props) => {
    
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
        if (storedUserLoggedInInformation === '1') {
            setIsAdmin(true);
        }
    }, []);

    const loginHandler = async (username, password) => {
        try {
            if (!username || !password) {
                alert("Please provide proper username & password to login");
            } else {
                const response = await axios.post('/v1/library/admin/login', { username, password});
                if (response.data.status === "success"){
                    localStorage.setItem('isLoggedIn', '1');
                    localStorage.setItem('token', response.data.accessToken)
                    setIsAdmin(true);
                    alert("Admin logged in successfully");
                }
            }
        } catch (err) {
            alert(`${err.response.data.title}: ${err.response.data.message}`);
        }

    };

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
        setIsAdmin(false);
        alert("Admin logged out successfully");
    };

    const userRegister = async (userdata) => {
        try {
            const response = await axios.post('/v1/library/users/register', userdata);
            if (response.status === 201) {
                alert("User registered successfully");
            };
        } catch (err) {
            alert(`${err.response.data.title}: ${err.response.data.message}`);
        }
    }

    return (
        <AuthContext.Provider value={{
            isAdmin: isAdmin,
            onLogin: loginHandler,
            onLogout: logoutHandler,
            onRegister: userRegister
        }}>
            { props.children }
        </AuthContext.Provider >
    )
};

export default AuthContext;