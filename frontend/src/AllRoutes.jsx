import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import Home from './Components/Home'

const AllRoutes = () => {

  return (
    <div>
     <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
     </Routes>

    </div>
  )
}

export default AllRoutes