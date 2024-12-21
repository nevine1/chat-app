"use client"
import { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    
      <nav className="w-screen py-4 bg-black text-white flex flex-col gap-2 sm:flex-row justify-around items-center sm:items-center ">
        <div>
          <h1>ChatApp</h1>
        </div>
        <div>
          <h2>{user.name} online</h2>
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
