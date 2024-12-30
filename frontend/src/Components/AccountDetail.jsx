import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../Style/AccountDetail.css"
import { FiArrowDownLeft } from "react-icons/fi";
import { MdArrowOutward } from "react-icons/md";

const AccountDetail = () => {
    const [account, setAccount] = useState([]);

    const fetchAccountDetails = async () => {
        try {
            let userId = JSON.parse(localStorage.getItem("userId"));
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.get(`http://localhost:8083/transactions/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

           
            setAccount(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchAccountDetails();
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

        return `${formattedDate}, ${formattedTime}`;
    }


    return (
        <div className="table-container">
            <h1 className="gradient-heading">Transaction</h1>

            <table className="account-table">
                <thead>
                    <tr className="table-header">
                        <th>Sr.No</th>
                        <th>Account Number</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Balance</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {account.map((acc, index) => (
                        <tr key={acc._id} className="table-row">
                            <td>{index + 1}</td>
                            <td>{acc.accountId}</td>
                            <td>{acc.type}</td>
                            <td className='type'>
                                <div>{acc.amount}</div>
                                <div className='icon'> {acc.type.toLowerCase() === "deposit" ? (
                                    <FiArrowDownLeft className="icon deposit-icon" />
                                ) : (
                                    <MdArrowOutward  className="icon withdraw-icon" />
                                )}</div>
                            </td>
                            <td>
                                <div>{acc.balanceAfterTransaction}</div>

                            </td>
                            <td>{formatDate(acc.date)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default AccountDetail