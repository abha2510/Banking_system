import React, { useState } from 'react';
import axios from 'axios';
import "../Style/Withdrawal.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import atm from "../assets/atm.jpg";
import bank from "../assets/bank.jpg";

const Withdrawal = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({
    userId: JSON.parse(localStorage.getItem("userId")) || "",
    accountId: JSON.parse(localStorage.getItem("accountId")) || "",
    amount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = (type) => setActiveModal(type);
  const closeModal = () => {
    setActiveModal(null);
    setFormData({
      userId: JSON.parse(localStorage.getItem("userId")) || "",
      accountId: JSON.parse(localStorage.getItem("accountId")) || "",
      amount: "",
    });
  };

  const handleSubmit = async (type) => {
    if (type === "Bank") {
      try {
        const response = await axios.post("http://localhost:8083/withdraw", {
          userId: formData.userId,
          accountId: formData.accountId,
          amount: formData.amount,
        });
        console.log("Response from server:", response.data);
        toast.success("Bank withdrawal successful!");
        closeModal();
      } catch (error) {
        console.error("Error during bank withdrawal:", error);
        toast.error("Failed to withdraw from bank. Please try again.");
      }
    } else if (type === "ATM") {
      console.log(`ATM withdrawal data:`, formData);
      closeModal();
    }
  };

  return (
    <div className='withdrawal-div'>
      <div className='buttons-div'>
        <div>
          <button onClick={() => openModal("bank")}>Withdrawal from Bank</button>
          <img src={bank} alt="Bank" />
        </div>
        <div>
          <button onClick={() => openModal("atm")}>Withdrawal from ATM Card</button>
          <img src={atm} alt="ATM" />
        </div>
      </div>


      {activeModal === "bank" && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>Bank Withdrawal Form</h2>
            <form>
              <label>
                User ID:
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  readOnly
                />
              </label>
              <label>
                Account ID:
                <input
                  type="text"
                  name="accountId"
                  value={formData.accountId}
                  readOnly
                />
              </label>
              <label>
                Amount:
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <div className='modal-buttons'>
                <button type="button" onClick={closeModal} className='cancel-button'>
                  Cancel
                </button>
                <button type="button" onClick={() => handleSubmit("Bank")} className='continue-button'>
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeModal === "atm" && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>ATM Withdrawal Form</h2>
            <form>
              <label>
                User ID:
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  readOnly
                />
              </label>
              <label>
                Card Number:
                <input
                  type="text"
                  name="accountId"
                  value={formData.accountId}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Amount:
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <div className='modal-buttons'>
                <button type="button" onClick={closeModal} className='cancel-button'>
                  Cancel
                </button>
                <button type="button" onClick={() => handleSubmit("ATM")} className='continue-button'>
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Withdrawal;
