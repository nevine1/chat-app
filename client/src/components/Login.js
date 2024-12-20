"use client"
import { useState } from 'react'

const Login = () => {
    const [email, setEmail ] = useState('')
    const [password, setPassword] = useState('')
  return (
    <div className="flex flex-col justify-center items-center mt-20 rounded-lg shadow-sm">
      <h1 className="text-[30px] text-red-700">Login Form</h1>
      <form className="w-[500px] bg-pink bg-gray-200 flex flex-col gap10 p-8 border border-gray-500">
        <input 
            type="text"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            placeholder="Email..."
            className="mb-8 px-4 py-3 text-base text-gray-900 outline-gray-300 placeholder:text-gray-400"
        />
        <input 
            type="password"
            value={password}
            onChange={(e) =>setPassword(e.target.value)}
            placeholder='Password...'
            className="mb-5 px-4 py-3 text-base text-gray-900 outline-gray-300 placeholder:text-gray-400"
        />
      </form>
    </div>
  )
}

export default Login
