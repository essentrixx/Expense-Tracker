import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts.jsx";
import { useGlobalContext } from "../../context/GlobalContext.jsx";
import Form from "../Form/Form.jsx";
import IncomeItem from "../IncomeItem/IncomeItem.jsx";
import ExpenseForm from "./ExpenseForm.jsx";

function Expenses() {
    const { addIncome, expenses, getExpenses, deleteExpense, totalExpense } = useGlobalContext();

    useEffect(() => {
        getExpenses();
    }, [])

    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Vanness Expenses</h1>
                <h2 className="total-income">Total Expense: <span>${totalExpense()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>

                    <div className="incomes">
                        {expenses.map((expense) => {
                            const { _id, title, amount, date, category, description, type } = expense;
                            return <IncomeItem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                type="expense"
                                category={category}
                                $indicatorcolor="var(--color-green)"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div
    `
        display: flex;
        overflow: auto;
        .total-income{
            display: flex;
            justify-content: center;
            align-items: center;
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            box-shadow: 0 1px 15px rgba(0, 0, 0, 0.06);
            border-radius: 20px;
            padding: 1rem;
            margin: 1rem 0;
            font-size: 2rem;
            gap: .5rem;
            span{
                font-size: 2rem;
                padding-left: 2px;
                font-weight: 600;
                color: var(--color-green);
            }
        }
        .income-content{
            display: flex;
            gap: 2rem;
            .incomes{
                flex: 1;
            }
        }
    `;

export default Expenses;