"use client"
import React, {useContext} from 'react'
import { AuthContext } from '@/context/AuthContext'
const page = () => {
    const { user } = useContext(AuthContext)
    
  return (
    <div>
      <h1>Hello { user.name}</h1>
    </div>
  )
}

export default page
