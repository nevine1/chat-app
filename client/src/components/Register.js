"use client"
import { useState, useContext } from 'react';
import { FiEye } from "react-icons/fi";
import { FaRegEyeSlash } from "react-icons/fa6";
import { AuthContext } from '../context/AuthContext'
import Link from 'next/link'
const Register = () => {
    const { user, registerInfo,
        updateRegisterInfo, registerUser, 
        setRegisterError, setRegisterLoading, 
        isRegisterLoading , registerError} = useContext(AuthContext)
    console.log(user);
    const handleChange = (e) => {
      const { name, value } = e.target;
      setRegisterInfo((prev) => ({
          ...prev,
          [name]: value
      }));
  };
  const [type, setType] = useState("text");
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="flex flex-col justify-center items-center mt-20 rounded-lg shadow-sm">
      <h1 className="text-[21px] text-blue-800 my-5">Creating new account!</h1>
      <form onSubmit={registerUser}
        className="w-[500px] bg-pink bg-gray-200 flex flex-col gap10 py-12 px-10
            border border-gray-500 rounded-md"
            >
        <input 
            type="text"
            value={registerInfo.name} 
            onChange={(e) =>updateRegisterInfo({...registerInfo, name: e.target.value})}
            placeholder="User Name ..."
            className="mb-10 px-4 py-4 text-base text-gray-900 rounded-md outline-gray-300 placeholder:text-gray-400"
        />
        <input 
            type="email"
            value={registerInfo.email}
            onChange={(e) =>updateRegisterInfo({...registerInfo, email: e.target.value})}
            placeholder="Email ..."
            className="mb-8 px-4 py-4 text-base text-gray-900 rounded-md outline-gray-300 placeholder:text-gray-400"
        />
        <div className="relative w-full max-w-md mx-auto"> 
            <input 
                type={showPassword ? "text" : "password"} 
                value={registerInfo.password} 
                onChange={(e) =>updateRegisterInfo({...registerInfo, password: e.target.value})}
                placeholder="Enter your password" 
                className="w-full mb-8 px-4 py-4 text-base text-gray-900 rounded-md outline-gray-300"
            />
            <div className="absolute right-3 top-1/4 transform -translate-y-1/2 cursor-pointer">
                {
                    showPassword ? 
                    <FiEye onClick={() => setShowPassword(!showPassword)} size={20}/> : 
                    <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} size={20}/>
                }
            </div>
        </div>


        <button type="submit"
            className="button-primary block mt-3 py-3 rounded-md text-white text-[18px] bg-blue-600">
            { isRegisterLoading ? " creating ur account" : "Register"}
        </button>
          {
              registerError?.message && 
              <p className="text-red-600 text-[16px]">
                  {registerError?.message === 'this user is already registered' 
                      ? 'User already exists. Try logging in.' 
                      : registerError?.message}
              </p>
          }


        <p className="text-center mt-6 text-gray-600 text-[15px]">Already have account   
            <Link href="/login" className="text-blue-400"> login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
