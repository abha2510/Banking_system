import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import Home from './Components/Home'
import Account from './Components/Account'

const AllRoutes = () => {

  return (
    <div>
     <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/account" element={<Account/>}></Route>
     </Routes>

    </div>
  )
}

export default AllRoutes