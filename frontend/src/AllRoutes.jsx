import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Account from './Components/Account'
import AccountDetail from './Components/AccountDetail'
import UserDetails from './Components/UserDetails'
import Logout from './Components/Logout'
import Dashboard from './Components/Dashboard'
import Register from './Components/Register'
import Login from './Components/Login'

const AllRoutes = () => {

  return (
    <div>
     <Routes>
        {/* <Route path="/" element={<Home/>}></Route> */}
        {/* <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route> */}
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route> 
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/account" element={<Account/>}></Route>
        <Route path="/transaction" element={<AccountDetail/>}></Route> 
        <Route path="/usertDetails" element={<UserDetails/>}></Route> 
        <Route path="/logout" element={<Logout/>}></Route>
      
     </Routes>

    </div>
  )
}

export default AllRoutes