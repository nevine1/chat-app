"use client"
import { useState, createContext, useCallback } from "react";
import { postRequest, baseURL } from "@/utils/service";
import { useRouter } from "next/navigation";
export const AuthContext = createContext();

export const  AuthContextProvider = ({children}) =>{
    const router = useRouter();
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setRegisterLoading] = useState(false)
    const [user, setUser ] = useState({ name: "vena"});
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
    
            setRegisterLoading(false);
    
            if (response.error) {
                return setRegisterError(response.error);  
            }
    
            // Store the registered user in localStorage
            localStorage.setItem("User", JSON.stringify(response));

            setUser(response);
           
            router.push("/dashboard");
    
        } catch (err) {
            console.error('Registration Error:', err.message);
            setRegisterError(err.message);
            setRegisterLoading(false);
        }
    }, [registerInfo]);
    

    /* const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setRegisterLoading(true);
        setRegisterError(null);
    
        // Ensure all fields are filled
        if (!registerInfo.name || !registerInfo.email || !registerInfo.password) {
            alert('Please fill in all fields');
            setRegisterLoading(false);
            return;
        }
    
        
        try {
            const response = await postRequest(
                'http://localhost:4000/api/users/register',
                JSON.stringify(registerInfo)
            );
            
            
            setRegisterLoading(false);
            localStorage.setItem("User", JSON.stringify(response));
            setUser(response);
            
            router.push('/dashboard');
            setRegisterInfo({ })
        } catch (error) {
            console.error('Registration Error:', error.message);
           
            setRegisterError(error.message);
            setRegisterLoading(false);
        }
    }, [registerInfo]); */
    
    
    
    
    const authValues = {user, registerInfo,
         updateRegisterInfo, registerUser, 
         setRegisterInfo,
         setRegisterError, setRegisterLoading,
         isRegisterLoading, registerError
        }
    return <AuthContext.Provider value={authValues}>
                {children}
           </AuthContext.Provider>
}