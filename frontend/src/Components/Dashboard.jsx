import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    CartesianGrid,
    ComposedChart,
    YAxis,
    Legend,
    Bar,
    ResponsiveContainer,
    Area,
    BarChart,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import "../Style/Dashboard.css";

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [chartData, setChartData] = useState([]);

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

            setTransactions(response.data);

            const transformedData = response.data.map((transaction) => ({
                date: new Date(transaction.date).toLocaleDateString(),
                balance: transaction.balanceAfterTransaction,
                type: transaction.type,
                amount: transaction.amount,
            }));

            setChartData(transformedData);
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

    return (
        <div style={{ width: "100%", height: "400px" }}>
            <h2>Dashboard</h2>
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
                                layout="horizontal"
                                align="center"
                                verticalAlign="bottom"
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