import React, { useContext, useState } from "react";
import axios from "axios";

const baseUrl = "http://localhost:3000/api/v1";
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${baseUrl}/addincome`, income);
            console.log("Response:", response.data);
        } catch (e) {
            console.error(e);
            setError(e.response?.data?.message || "Failed to add income");
        }

        await getIncomes()
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

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}