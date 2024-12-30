import React from "react";
import AllRoutes from "./AllRoutes";
import "./App.css";
import Sidebar from "./Components/Sidebar";

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-container">
        <AllRoutes />
      </div>
    </div>
  );
}

export default App;
