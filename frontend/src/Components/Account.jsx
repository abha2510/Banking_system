import React, { useState } from 'react'
import "../Style/Account.css"
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Account = () => {
    const [account, setAccount] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        accountType: "",
        balance: 0,
        phone: "",
        pan: "",
        aadharNo: "",
        address: {
            street: "",
            city: "",
            state: "",
            zip: ""
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("address.")) {
            const field = name.split(".")[1];
            setAccount((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [field]: value,
                },
            }));
        } else {
            setAccount((prev) => ({ ...prev, [name]: value }));
        }
    };

    const validateForm = () => {
        const { firstName, lastName, dob, phone, pan, aadharNo, address } = account;

        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!panRegex.test(pan)) {
            toast.error("Invalid PAN format. Example: ABCDE1234F");
            return false;
        }

        const aadharRegex = /^\d{12}$/;
        if (!aadharRegex.test(aadharNo)) {
            toast.error("Aadhar number must be exactly 12 digits.");
            return false;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            toast.error("Phone number must be exactly 10 digits.");
            return false;
        }

        const dobDate = new Date(dob);
        if (dobDate > new Date()) {
            toast.error("Date of Birth cannot be in the future.");
            return false;
        }

        if (!firstName || !lastName || !dob || !address.street || !address.city || !address.state || !address.zip) {
            toast.error("All fields are required.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return
        } else {
            const token = JSON.parse(localStorage.getItem("token"));
            if (!token) {
                return toast.error("User is not authenticated.");
            }
            try {
                const response = await axios.post(
                    "http://localhost:8083/account/create",
                    account,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 200 || response.status === 201) {
                    toast.success(response.data.message);
                    setAccount({
                        firstName: "",
                        lastName: "",
                        dob: "",
                        gender: "",
                        accountType: "",
                        balance: 0,
                        phone: "",
                        pan: "",
                        aadharNo: "",
                        address: {
                            street: "",
                            city: "",
                            state: "",
                            zip: ""
                        }
                    })
                    console.log("Account Created:", response.data.account);
                    localStorage.setItem("userId", JSON.stringify(response.data.account.userId ));
                    localStorage.setItem("accountId", JSON.stringify(response.data.account._id ))
                }
            } catch (error) {
                console.error(error.response?.data?.message || error.message);
                toast.error(error.response?.data?.message || "Account creation failed.");
            }
        }


    };

    return (
        <div className="account-form-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit} className="account-form">
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={account.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={account.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={account.dob}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <select
                        name="gender"
                        value={account.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Account Type</label>
                    <select
                        name="accountType"
                        value={account.accountType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="Savings">Savings</option>
                        <option value="Current">Current</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Balance</label>
                    <input
                        type="number"
                        name="balance"
                        value={account.balance}
                        onChange={handleChange}
                        placeholder="Enter initial balance"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={account.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>PAN</label>
                    <input
                        type="text"
                        name="pan"
                        value={account.pan}
                        onChange={handleChange}
                        placeholder="Enter PAN"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Aadhar No</label>
                    <input
                        type="number"
                        name="aadharNo"
                        value={account.aadharNo}
                        onChange={handleChange}
                        placeholder="Enter Aadhar Number"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Street</label>
                    <input
                        type="text"
                        name="address.street"
                        value={account.address.street}
                        onChange={handleChange}
                        placeholder="Enter street"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input
                        type="text"
                        name="address.city"
                        value={account.address.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>State</label>
                    <input
                        type="text"
                        name="address.state"
                        value={account.address.state}
                        onChange={handleChange}
                        placeholder="Enter state"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>ZIP</label>
                    <input
                        type="text"
                        name="address.zip"
                        value={account.address.zip}
                        onChange={handleChange}
                        placeholder="Enter ZIP"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">
                    Create Account
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Account