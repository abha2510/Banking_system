import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    XAxis,
    Tooltip,
    CartesianGrid,
    YAxis,
    Legend,
    Bar,
    ResponsiveContainer,
    BarChart,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import "../Style/Dashboard.css";
import { PaymentCard } from "react-payment-cards";
import { FiArrowDownLeft } from "react-icons/fi";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import noDataFoundGif from "../assets/noDataFound.gif";


const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [lastSeen, setLastSeen] = useState("");
    const [userDetails, setUserDetails] = useState([]);
    const navigate = useNavigate();

    const fetchAccountDetails = async () => {
        try {
            let userId = JSON.parse(localStorage.getItem("userId"));
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.get(
                `http://localhost:8083/transactions/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            setTransactions(response.data);

            const transformedData = response.data.map((transaction) => ({
                date: new Date(transaction.date).toLocaleDateString(),
                balance: transaction.balanceAfterTransaction,
                type: transaction.type,
                amount: transaction.amount,
            }));

            setChartData(transformedData);
            const latestTransaction = response.data.reduce((latest, transaction) => {
                return new Date(transaction.date) > new Date(latest.date)
                    ? transaction
                    : latest;
            }, response.data[0]);

            const lastSeenDate = new Date(latestTransaction.date);

            const formattedDate = lastSeenDate.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            });

            const formattedTime = lastSeenDate.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });

            const lastSeen = `${formattedDate}, ${formattedTime}`;

            setLastSeen(lastSeen);
            const res = await axios.get(
                `http://localhost:8083/account/accountDetailsByUser/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUserDetails(res.data);
            localStorage.setItem("accountId", JSON.stringify(res.data[0]?._id));

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAccountDetails();
    }, []);
    const getPieChartData = () => {
        const groupedData = transactions.reduce(
            (acc, transaction) => {
                if (transaction.type === "Deposit") {
                    acc.deposits += transaction.amount;
                } else if (transaction.type === "Withdrawal") {
                    acc.withdrawals += transaction.amount;
                }
                return acc;
            },
            { deposits: 0, withdrawals: 0 }
        );

        return [
            { name: "Deposits", value: groupedData.deposits },
            { name: "Withdrawals", value: groupedData.withdrawals },
        ];
    };

    const pieChartData = getPieChartData();
    console.log("userdetails", userDetails);


    const cardDetails = {
        cardHolderName: `${userDetails[0]?.firstName} ${userDetails[0]?.lastName}`,
        cardValidity: userDetails[0]?.cardValidity,
        cardSecurityCode: userDetails[0]?.cardSecurityCode,
        cardNumber: userDetails[0]?.atmCardNumber,
    };
    //   const cardDetails = {
    //     cardHolderName: `${userDetails[0]?.firstName} ${userDetails[0]?.lastName}`,
    //     cardValidity: userDetails[0]?.cardValidity,
    //     cardSecurityCode: userDetails[0]?.cardSecurityCode,
    //     cardNumber: userDetails[0]?.atmCardNumber,
    // };
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

        return `${formattedDate}, ${formattedTime}`;
    }
    const checkAllTransaction = () => {
        navigate("/transaction")
    }
 
    return (
        <div style={{ width: "100%", height: "400px" }}>
            {userDetails.length > 0 && (
                <>
                    <h2 className="firstname">Hey {userDetails[0]?.firstName}, Welcome back to Online Banking</h2>
                    <p className="last-seen">Last seen: {lastSeen || "N/A"}</p>
                </>
            )}

            <div>
                {transactions.length > 0 ? (
                    <>
                        <div className="all-transaction">
                            <p>Account Type: {userDetails[0]?.accountType}</p>
                            <button onClick={checkAllTransaction}>All Transactions</button>
                        </div>
                        <table className="transaction-table">
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
                                {transactions
                                .sort((a, b) => new Date(b.date) - new Date(a.date)) 
                                .slice(0, 3) 
                                .map((acc, index) => (
                                    <tr key={acc._id} className="table-row">
                                        <td>{index + 1}</td>
                                        <td>{acc.accountId}</td>
                                        <td>{acc.type}</td>
                                        <td className='type'>
                                            <div>{acc.amount}</div>
                                            <div className='icon'>
                                                {acc.type.toLowerCase() === "deposit" ? (
                                                    <FiArrowDownLeft className="icon deposit-icon" />
                                                ) : (
                                                    <MdArrowOutward className="icon withdraw-icon" />
                                                )}
                                            </div>
                                        </td>
                                        <td>{acc.balanceAfterTransaction}</td>
                                        <td>{formatDate(acc.date)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="main-container">
                            <div className="chart-container">
                                <ResponsiveContainer width="100%" height={500}>
                                    <PieChart>
                                        <Pie
                                            data={pieChartData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={120}
                                            label
                                        >
                                            {pieChartData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.name === "Deposits" ? "#A04747" : "#D8A25E"}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend layout="vertical" align="right" verticalAlign="middle" />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="chart-container">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="amount" fill="#A2678A" />
                                        <Bar dataKey="balance" fill="#4D3C77" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </>
                ) : (
                            <div className="no-data-container">
                                <img src={noDataFoundGif} alt="No Data Found" className="no-data-gif" />
                                <button className="login-button" onClick={() => navigate('/login')}>
                                    Go to Login
                                </button>
                            </div>
                )}
            </div>
            {cardDetails.cardNumber && (
                <PaymentCard
                    cardDetails={cardDetails}
                    flipped={false}
                    cardBgColor="sea"
                />
            )}
        </div>
    );
    // return (
    //     <div style={{ width: "100%", height: "400px" }}>
    //         <h2 className="firstname">Hey {userDetails[0]?.firstName}, Welcome back to Online Banking</h2>
    //         <p className="last-seen">Last seen: {lastSeen}</p>
    //         <div>
    //             <div className="all-transaction">
    //             <p>Account Type: {userDetails[0]?.accountType}</p>
    //             <button onClick={checkAllTransaction}>All Transaction</button>
    //             </div>
    //             <table className="transaction-table">
    //                 <thead>
    //                     <tr className="table-header">
    //                         <th>Sr.No</th>
    //                         <th>Account Number</th>
    //                         <th>Type</th>
    //                         <th>Amount</th>
    //                         <th>Balance</th>
    //                         <th>Date</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {transactions.slice(-3).map((acc, index) => (
    //                         <tr key={acc._id} className="table-row">
    //                             <td>{index + 1}</td>
    //                             <td>{acc.accountId}</td>
    //                             <td>{acc.type}</td>
    //                             <td className='type'>
    //                                 <div>{acc.amount}</div>
    //                                 <div className='icon'> {acc.type.toLowerCase() === "deposit" ? (
    //                                     <FiArrowDownLeft className="icon deposit-icon" />
    //                                 ) : (
    //                                     <MdArrowOutward className="icon withdraw-icon" />
    //                                 )}</div>
    //                             </td>
    //                             <td>
    //                                 <div>{acc.balanceAfterTransaction}</div>

    //                             </td>
    //                             <td>{formatDate(acc.date)}</td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         </div>
    //         <div className="main-container">
    //             <div className="chart-container">
    //                 <ResponsiveContainer width="100%" height={500}>
    //                     <PieChart>
    //                         <Pie
    //                             data={pieChartData}
    //                             dataKey="value"
    //                             nameKey="name"
    //                             cx="50%"
    //                             cy="50%"
    //                             outerRadius={120}
    //                             label
    //                         >
    //                             {pieChartData.map((entry, index) => (
    //                                 <Cell
    //                                     key={`cell-${index}`}
    //                                     fill={entry.name === "Deposits" ? "#A04747" : "#D8A25E"}
    //                                 />
    //                             ))}
    //                         </Pie>
    //                         <Tooltip />
    //                         <Legend
    //                             layout="vertical"
    //                             align="right"
    //                             verticalAlign="middle"
    //                         />

    //                     </PieChart>
    //                 </ResponsiveContainer>
    //             </div>

    //             <div className="chart-container">
    //                 <ResponsiveContainer width="100%" height={300}>
    //                     <BarChart data={chartData}>
    //                         <CartesianGrid strokeDasharray="3 3" />
    //                         <XAxis dataKey="date" />
    //                         <YAxis />
    //                         <Tooltip />
    //                         <Legend />
    //                         <Bar dataKey="amount" fill="#A2678A" />
    //                         <Bar dataKey="balance" fill="#4D3C77" />
    //                     </BarChart>
    //                 </ResponsiveContainer>
    //             </div>
    //         </div>
    //         {cardDetails.cardNumber && (
    //             <PaymentCard
    //                 cardDetails={cardDetails}
    //                 flipped={false}
    //                 cardBgColor="sea"
    //             />
    //         )}
    //     </div>
    // );
};

export default Dashboard;
