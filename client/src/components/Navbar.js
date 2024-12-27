"use client"
import { useContext , useEffect} from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  console.log('local', JSON.parse(localStorage.getItem("User")))
useEffect(() =>{
  if(localStorage){
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user))
  }
}, []);
console.log("navbar user is", user.user)
  return (
    
      <nav className="w-screen py-4 bg-black text-white flex flex-col gap-2 sm:flex-row justify-around items-center sm:items-center ">
        <div>
          <h1>ChatApp</h1>
        </div>
        <div>
          <h2>{user.user.name} online</h2>
        </div>
        <ul className="flex flex-row sm:gap-3 items-center">
          <li>
            <Link href="/login" className="mr-3">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </ul>
      </nav>
   
  );
};

export default Navbar;
