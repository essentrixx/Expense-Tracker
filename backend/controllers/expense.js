const ExpenseSchema = require("../models/expenseModel");

// Push Method
exports.addExpense = async (req, res) => {
    console.log(req.body);

    const { title, amount, category, description, date } = req.body;

    if (!title || !amount || !category || !description || !date) {
        return res.status(400).json({ message: "All fields are required" })
    }

    if (typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({ message: "Amount must be a positive number" });
    }

    try {
        const income = ExpenseSchema({
            title,
            amount,
            category,
            description,
            date,
        })
        console.log(income);

        await income.save();
        res.status(200).json({ message: "Expense successfully" });

    } catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(e.message);
    }
}

// Get Method
exports.getExpense = async (req, res) => {
    try {
        const incomes = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (e) {
        res.status(400).json({ message: "404 Not Found" });
        console.error(e.message);
    }
}

// Update income (PUT)
exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { title, amount, category, description, date } = req.body;

    // Validation
    if (!title || !amount || !category || !description || !date) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: "Amount must be a positive number" });
    }

    try {
        const updatedExpense = await ExpenseSchema.findByIdAndUpdate(
            id,
            { title, amount, category, description, date },
            { new: true, runValidators: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense updated successfully", updatedExpense });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete Method
exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);

    try {
        const deletedIncome = await ExpenseSchema.findByIdAndDelete(id);

        if (!deletedIncome) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Internal Server Error, cannot be deleted" });
    }
}