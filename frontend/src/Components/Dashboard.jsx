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

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [lastSeen, setLastSeen] = useState(""); 
    const [userDetails,setUserDetails] = useState([]);

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
   console.log("userdetails",userDetails);
   
    return (
        <div style={{ width: "100%", height: "400px" }}>
            <h2 className="firstname">Hey {userDetails[0]?.firstName}, Welcome back to Online Banking</h2>
            <p className="last-seen">Last seen: {lastSeen}</p> 
            <div>
                <p>Account Type: {userDetails[0]?.accountType}</p>
            </div>
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
                            <Legend
                                layout="vertical"
                                align="right"
                                verticalAlign="middle"
                            />

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
        </div>
    );
};

export default Dashboard;

{/* <ResponsiveContainer>
                <ComposedChart data={chartData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Area
                        type="monotone"
                        dataKey="balance"
                        fill="#8884d8"
                        stroke="#8884d8"
                    />
                    <Line type="monotone" dataKey="balance" stroke="#ff7300" />
                    <Bar dataKey="amount" barSize={20} fill="#413ea0" />
                </ComposedChart>
            </ResponsiveContainer> */}