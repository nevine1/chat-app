"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {

  const {
    loginUser,
    loginInfo,
    updateLoginInfo,
    isLoading,
    error,
    } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="text-2xl font-bold text-blue-800">Sign In</h1>
      
      <form onSubmit={loginUser} className="w-[400px] bg-gray-100 p-6 rounded-md shadow-md">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          value={loginInfo.email}
          onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })}
          placeholder="Email"
          required
          className="w-full px-4 py-3 mb-4 border rounded-md"
          autoComplete="on"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={loginInfo.password}
            onChange={(e) => updateLoginInfo({...loginInfo, password: e.target.value })}
            placeholder="Password"
            required
            className="w-full px-4 py-3 border rounded-md"
          />
          <div
            className="absolute right-3 top-4 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ?   <FiEye /> : <FiEyeOff />}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full mt-6 py-3 rounded-md text-white ${
            isLoading ? "bg-gray-500" : "bg-blue-600"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
