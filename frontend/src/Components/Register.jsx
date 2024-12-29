import React, { useState } from 'react';
import axios from 'axios';
import "../Style/Register.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({ switchToLogin }) => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.name || !data.email || !data.password || !data.confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (data.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post('http://localhost:8083/users/register', data);
            if (res.status === 200 || res.status === 201) {
                toast.success("User Registered Successfully");
                setData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
                switchToLogin(); 
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred during registration");
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter Name"
                        required
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter Email"
                        required
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                </div>

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

                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="password-input">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            required
                            value={data.confirmPassword}
                            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                        />
                        <span
                            className="toggle-password"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={{ cursor: 'pointer', marginLeft: '10px' }}
                        >
                            {showConfirmPassword ? "👁️" : "🙈"}
                        </span>
                    </div>
                </div>

                <p>Already have an account? <a href="#" onClick={switchToLogin}>Login</a></p>
                <button type="submit">Submit</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Register;
