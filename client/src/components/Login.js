"use client"
import { useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from '@/context/AuthContext'
const Login = () => {
  const { user , loginUser , loginInfo, setLoginInfo } = useContext(AuthContext)

  return (
    <div className="flex flex-col justify-center items-center mt-20 rounded-lg shadow-sm">
      <h1 className="text-[21px] text-blue-800 my-5">Sign in!</h1>
      <form onSubmit={loginUser}
        className="w-[500px] bg-pink bg-gray-200 flex flex-col gap10 py-12 px-10 
            border border-gray-500 rounded-md"
            >
       
        <input 
            type="text"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            placeholder="Email..."
            className="mb-8 px-4 py-4 text-base text-gray-900 rounded-md outline-gray-300 placeholder:text-gray-400"
        />
        <input 
            type="password"
            value={password}
            onChange={(e) =>setPassword(e.target.value)}
            placeholder='Password...'
            className=" mb-5 px-4 py-4 text-base text-gray-900 outline-gray-300 rounded-md placeholder:text-gray-400"
        />
        <button type="submit"
            className="button-primary block mt-3 py-3 rounded-md text-white text-[18px] bg-blue-600">
            Submit
        </button>
        
        <p className="text-center mt-6 text-gray-600 text-[15px]">Create new account
            <Link href="/register" className="text-blue-400"> Register</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
