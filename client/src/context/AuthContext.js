"use client"
import { useState, useEffect, createContext, useCallback } from "react";
import { postRequest, baseURL } from "@/utils/service";
import { useRouter } from "next/navigation";
export const AuthContext = createContext();

export const  AuthContextProvider = ({children}) =>{
    const router = useRouter();
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setRegisterLoading] = useState(false)
    const [user, setUser ] = useState({ });
    const [registerInfo, setRegisterInfo] = useState({
        name: "", 
        email: " ",
        password: "",
        
    });
    
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
        
    }, []);
    
    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setRegisterLoading(true);
        setRegisterError(null);
    
        if (!registerInfo.name || !registerInfo.email || !registerInfo.password) {
            setRegisterLoading(false);
            return res.json("All fields are required");  
        }
    
        try {
            const response = await postRequest(
                `${baseURL}/users/register`,
                JSON.stringify(registerInfo)
            );
            console.log("response is", JSON.stringify(response.user));
    
            setRegisterLoading(false);
    
            if (response.error) {
                return setRegisterError(response.error);  
            }
    
            // Store the entire response including the token
            localStorage.setItem("User", JSON.stringify(response));
    
            setUser(response);
            router.push("/dashboard");
    
        } catch (err) {
            console.error('Registration Error:', err.message);
            setRegisterError(err.message);
            setRegisterLoading(false);
        }
    }, [registerInfo]);

    
   useEffect(() =>{

    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));

   }, []) 

    
    const authValues = {user, setUser, registerInfo,
         updateRegisterInfo, registerUser, 
         setRegisterInfo,
         setRegisterError, setRegisterLoading,
         isRegisterLoading, registerError
        }
    return <AuthContext.Provider value={authValues}>
                {children}
           </AuthContext.Provider>
}