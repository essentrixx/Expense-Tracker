import React from "react";
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import { dateFormat } from "../../utils/dateFormat.jsx";

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function Chart() {
    const { incomes, expenses } = useGlobalContext();

    const data = {
        labels: incomes.map((inc) => dateFormat(inc.date)),
        datasets: [
            {
                label: 'Income',
                data: incomes.map((income) => income.amount),
                borderColor: 'green',
                backgroundColor: 'green',
                tension: 0.2,
                fill: false,
            },
            {
                label: 'Expenses',
                data: expenses.map((expense) => expense.amount),
                borderColor: 'red',
                backgroundColor: 'red',
                tension: 0.2,
                fill: false,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            // legend: {
            //     position: 'top',
            // },
            // title: {
            //     display: true,
            //     text: 'Income vs Expenses',
            // },
        },
    };

    return (
        <ChartStyled>
            <Line data={data} options={options} />
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart;
