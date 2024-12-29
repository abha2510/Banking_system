import React from 'react';
import AllRoutes from './AllRoutes';
import './App.css';
import { useLocation } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
function App() {
  const location = useLocation();
  const hideSidebarRoutes = ['/login', '/register']; 

  return (
    <div className="app-container">
      {!hideSidebarRoutes.includes(location.pathname) && <Sidebar />}
      <div className="content-container">
        <AllRoutes />
      </div>
    </div>
  );
}
export default App;
