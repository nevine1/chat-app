"use client"
import { useState, createContext, useCallback } from "react";

export const AuthContext = createContext();

export const  AuthContextProvider = ({children}) =>{
    const [user, setUser ] = useState({ name: "vena"});
    const [registerInfo, setRegisterInfo] = useState({
        username: "", 
        email: " ",
        password: "",
    });
    
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);
console.log(registerInfo)
    return <AuthContext.Provider value={{user, registerInfo, updateRegisterInfo}}>
                {children}
           </AuthContext.Provider>
}