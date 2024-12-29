import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import '../Style/ToggleForm.css';

const ToggleForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const switchToLogin = () => {
        setIsLogin(true); 
    };
    const switchToRegister = () => {
        setIsLogin(false);
    };
    return (
        <div className="toggle-form-container">
            <div className="toggle-switch">
                <span
                    className={`toggle-option ${isLogin ? 'active' : ''}`}
                    onClick={() => setIsLogin(true)}
                >
                    Login
                </span>
                <span
                    className={`toggle-option ${!isLogin ? 'active' : ''}`}
                    onClick={() => setIsLogin(false)}
                >
                    Register
                </span>
                <div className={`toggle-slider ${isLogin ? 'login' : 'register'}`}></div>
            </div>
            <div className="form-content">
                {isLogin ? <Login switchToRegister={switchToRegister}/> : <Register switchToLogin={switchToLogin} />}
            </div>
        </div>
    );
};

export default ToggleForm;
