import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Account from './Components/Account'
import AccountDetail from './Components/AccountDetail'
import UserDetails from './Components/UserDetails'
import Logout from './Components/Logout'
import Dashboard from './Components/Dashboard'
import ToggleForm from './Components/ToggleForm'
import Withdrawal from './Components/Withdrawal'
import Deposit from './Components/Deposit'
import LoanRequest from './Components/LoanRequest'

const AllRoutes = () => {

  return (
    <div>
     <Routes>
        <Route path="/register" element={<ToggleForm/>}></Route>
        <Route path="/login" element={<ToggleForm/>}></Route> 
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/account" element={<Account/>}></Route>
        <Route path="/transaction" element={<AccountDetail/>}></Route> 
        <Route path="/usertDetails" element={<UserDetails/>}></Route> 
        <Route path="/logout" element={<Logout/>}></Route>
        <Route path="/withdrawal" element={<Withdrawal/>}></Route>
        <Route path="/deposit" element={<Deposit/>}></Route>
        <Route path="/loan" element={<LoanRequest/>}></Route>
     </Routes>

    </div>
  )
}

export default AllRoutes