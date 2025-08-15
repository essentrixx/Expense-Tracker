import React, { useContext, useState } from "react";
import axios from "axios";

// Change this to your Render backend URL
const baseUrl = import.meta.env.VITE_API_URL;
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    // SECTION INCOME
    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${baseUrl}/addincome`, income);
            // setIncomes(response.data);
            console.log("Response:", response.data);
            await getIncomes()
        } catch (e) {
            console.error(e);
            setError(e.response?.data?.message || "Failed to add income");
        }
    }

    const getIncomes = async () => {
        try {
            const response = await axios.get(`${baseUrl}/getincome`);
            setIncomes(response.data);
            console.log(response.data);
        } catch (e) {
            console.error(e);
            setError(e.response?.data?.message || "Failed to get income");
        }
    }

    const deleteIncome = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}/deleteincome/${id}`);
            console.log(response.data);
            await getIncomes();
        } catch (e) {
            console.error(e);
        }
    }

    // Calculate total income as a number
    const totalIncome = () => {
        return incomes.reduce((acc, income) => acc + income.amount, 0);
    };

    console.log("Total Income:", totalIncome());


    // SECTION EXPENSE
    const addExpense = async (income) => {
        try {
            const response = await axios.post(`${baseUrl}/addexpense`, income);
            // setExpenses(response.data);
            console.log("Response:", response.data);
            await getExpenses();
        } catch (e) {
            console.error(e);
            setError(e.response?.data?.message || "Failed to add income");
        }
    }

    const getExpenses = async () => {
        try {
            const response = await axios.get(`${baseUrl}/getexpense`);
            setExpenses(response.data);
            console.log(response.data);
        } catch (e) {
            console.error(e);
            setError(e.response?.data?.message || "Failed to get expenses");
        }
    }

    const deleteExpense = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}/deleteexpense/${id}`);
            console.log(response.data);
            await getExpenses();
        } catch (e) {
            console.error(e);
        }
    }

    // Calculate total expense as a number
    const totalExpense = () => {
        let total = 0;
        expenses.forEach(expense => {
            total += expense.amount;
        })

        return total;
    }

    console.log("Total Expense:", totalExpense());

    const totalBalance = () => {
        return totalIncome() - totalExpense()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        })

        return history.slice(0, 3)
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
            expenses,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpense,
            totalBalance,
            transactionHistory,
            error
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}