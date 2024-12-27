"use client";
import React, {useContext} from 'react'
import { AuthContext } from '@/context/AuthContext'
const page = () => {
    const { user, registerInfo } = useContext(AuthContext)
 
  return (
    <div>
      <h1>Hello { registerInfo.name}</h1>
    </div>
  )
}

export default page
