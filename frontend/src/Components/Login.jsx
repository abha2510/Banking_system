import React, { useState } from 'react'
import axios from 'axios';
import "../Style/Login.css"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
      const [showPassword, setShowPassword] = useState(false);
      const navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.email || !data.password) {
            toast.error("All fields are required");
            return;
        }

        try {
            await axios.post('http://localhost:8083/users/login', data).then((res) => {
                console.log(res);
                if (res.status == 200) {
                    localStorage.setItem("token", JSON.stringify(res.data.token))
                    toast.success(res.data.message, {
                        onClose: () => navigate('/account'), 
                    });
                }else{
                    toast.error(res.data.message);
                }
               
            })
        } catch (error) {
            console.log(error.message);

            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again later.");
            }

        }

    }
    return (
        <>
           
        <form onSubmit={handleSubmit} className="login-form">
        <label className="input-label">
            Email:
            <input
                type="email"
                name="email"
                placeholder="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                className="input-field"
            />
        </label>
        <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"} 
                            id="password"
                            placeholder="Enter Password"
                            required
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ cursor: 'pointer', marginLeft: '10px' }}
                        >
                            {showPassword ? "👁️" : "🙈"} 
                        </span>
                    </div>
                </div>
        <button type="submit" className="submit-btn">Login</button>
    </form>
    <ToastContainer />

        </>
    )
}


export default Login