import React, { useState } from 'react';
import axios from 'axios';
import '../Style/LoanRequest.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoanRequest = () => {
  const [formData, setFormData] = useState({
    userId: JSON.parse(localStorage.getItem("userId")) || "",
    accountId: JSON.parse(localStorage.getItem("accountId")) || "",
    amount: '',
    description: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await axios.post('http://localhost:8083/loanReq', formData);
       toast.success("Your loan request has been submitted and is under review.");
    } catch (error) {
      toast.error("Unable to process loan request. Please check your details and try again.");
      console.error(error);
    }
  };

  return (
    <div className="loan-request-container">
      <h2>Loan Request Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
        />

        <label htmlFor="accountId">Account ID:</label>
        <input
          type="text"
          id="accountId"
          name="accountId"
          value={formData.accountId}
          onChange={handleChange}
          required
        />

        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          min="0"
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Submit Loan Request</button>
      </form>

       <ToastContainer />
    </div>
  );
};

export default LoanRequest;
