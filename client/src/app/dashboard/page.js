"use client";
import React, {useContext} from 'react'
import { AuthContext } from '@/context/AuthContext'
const page = () => {
    const { user} = useContext(AuthContext)
 
  return (
    <div>
      { user && 
        <>
          <h1>{user.name}</h1>
          <h1>{user.email}</h1>
        </>
      }
    </div>
  )
}

export default page
