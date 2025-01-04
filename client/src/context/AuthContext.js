"use client"
import { useState, useEffect, createContext, useCallback } from "react";
import { postRequest, baseURL } from "@/utils/service";
import { useRouter } from "next/navigation";
export const AuthContext = createContext();

export const  AuthContextProvider = ({children}) =>{
    const router = useRouter();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser ] = useState({ });
    const [registerInfo, setRegisterInfo] = useState({
        name: "", 
        email: " ",
        password: "",
        
    });
    
    const [loginInfo, setLoginInfo] = useState({
        name: "", 
        email: " ",
    });
     useEffect(() =>{
        const user = localStorage.getItem("User");
        setUser(JSON.stringify(user))
     }, [])
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
        
    }, []);
    
    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
    
        if (!registerInfo.name || !registerInfo.email || !registerInfo.password) {
            setIsLoading(false);
            return res.json("All fields are required");  
        }
    
        try {
            const response = await postRequest(
                `${baseURL}/users/register`,
                JSON.stringify(registerInfo)
            );
            //this step to destruct user from the response to can get the name and email of the user
            const { user, token } = response;
    
            setIsLoading(false);
    
            if (response.error) {
                return setError(response.error);  
            }
            
            // Store the entire response including the token
            localStorage.setItem("User", JSON.stringify(response.user));
    
            setUser(response.user);
            
            router.push("/dashboard");
   
        } catch (err) {
            console.error('Registration Error:', err.message);
            setError(err.message);
            setIsLoading(false);
        }
    }, [registerInfo]);

    
   useEffect(() =>{

    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));

   }, []) 


   const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
    
    }, []);

    const loginUser = useCallback(async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
    
        try {
          const response = await postRequest(
            `${"http://localhost:4000/api"}/users/login`,
            JSON.stringify(loginInfo)
          );
    
          setIsLoading(false);
    
          if (response.error) {
            setError("Invalid email or password");
            return;
          }
    
          // Save to localStorage
          localStorage.setItem("User", JSON.stringify(response));
          setUser(response.user);
          router.push("/dashboard")
          console.log("User:", response.user);
        } catch (err) {
          setError("Failed to login. Please try again.");
          setIsLoading(false);
          console.error("Login Error:", err);
        }
      }, [loginInfo]);

   
    const logOutUser = () =>{
        localStorage.removeItem("User");
        setUser(null);
        router.push("/login")
    }
    const authValues = {user, setUser, registerInfo,
         updateRegisterInfo, registerUser, 
         setRegisterInfo, updateLoginInfo, 
         setError, setIsLoading,
         isLoading, error,
         logOutUser, loginUser
        }
    return <AuthContext.Provider value={authValues}>
                {children}
           </AuthContext.Provider>
}