"use client"
import { useContext , useEffect} from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);


  return (
    
      <nav className="w-screen py-4 bg-black text-white flex flex-col gap-2 sm:flex-row justify-around items-center sm:items-center ">
        <div>
          <h1>ChatApp</h1>
        </div>
        <div>
          <h2>{user && `${user.name} online`} </h2>
        </div>
        <ul className="flex flex-row sm:gap-3 items-center">
           <Link href="/chat" className="">Chat</Link> 
         {
          user ? (
            <Link href="/" className="" onClick={logOutUser}>Logout {user.name}</Link>
          ) : (
            <>
              <Link href="/register" className="">Register</Link>
              <Link href="/login" className="">Login</Link>
            </>
          )
         }

         
        </ul>
      </nav>
   
  );
};

export default Navbar;
