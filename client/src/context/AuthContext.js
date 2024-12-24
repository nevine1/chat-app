"use client"
import { useState, createContext, useCallback } from "react";
import { postRequest } from "@/utils/service";
import { stringify } from "postcss";
export const AuthContext = createContext();

export const  AuthContextProvider = ({children}) =>{
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setRegisterLoading] = useState(false)
    const [user, setUser ] = useState({ name: "vena"});
    const [registerInfo, setRegisterInfo] = useState({
        userName: "", 
        email: " ",
        password: "",
    });
    
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
        
    }, []);
    
    const registerUser = useCallback( async (e) =>{
        e.preventDefault();
        setRegisterLoading(true);

        setRegisterError(null)

        const response = await postRequest(`${baseURL}/users/register`,
                        JSON.stringify(registerInfo));
        
        setRegisterLoading(false);

        if(response.error){
            return setRegisterError(error)
        }
        //store the register in the local storage ; 
        localStorage.setItem("User", stringify(response))
        setUser(response)
    })
    const authValues = {user, registerInfo,
         updateRegisterInfo, registerUser, 
         setRegisterError, setRegisterLoading,
         isRegisterLoading
        }
    return <AuthContext.Provider value={authValues}>
                {children}
           </AuthContext.Provider>
}