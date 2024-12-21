import { useState} from 'react'
import Link from 'next/link'
const Register = () => {
    const [email, setEmail ] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
  return (
    <div className="flex flex-col justify-center items-center mt-20 rounded-lg shadow-sm">
      <h1 className="text-[30px] text-red-700">Register Form</h1>
      <form 
        className="w-[500px] bg-pink bg-gray-200 flex flex-col gap10 py-12 px-10
            border border-gray-500 rounded-md"
            >
        <input 
            type="text"
            value={userName}
            onChange={(e) =>setUserName(e.target.value)}
            placeholder="User Name ..."
            className="mb-10 px-4 py-4 text-base text-gray-900 rounded-md outline-gray-300 placeholder:text-gray-400"
        />
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
        
        <p className="text-center mt-4 text-gray-600 text-[15px]">Already have account   
            <Link href="/login" className="text-blue-400"> login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
