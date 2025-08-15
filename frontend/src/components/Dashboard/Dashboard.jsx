import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts.jsx";
import Chart from "../Chart/Chart.jsx";
import { dollar } from "../../utils/Icons.jsx";
import { useGlobalContext } from "../../context/GlobalContext.jsx";

function Dashboard() {
    const { totalExpense, totalIncome, totalBalance } = useGlobalContext();

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transaction</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>

                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>
                                    {dollar} {totalExpense()}
                                </p>
                            </div>

                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>{dollar} {totalBalance()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div
    `

    `;

export default Dashboard;