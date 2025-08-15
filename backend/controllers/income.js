const incomeSchema = require("../models/incomeModel");

// Push Method
exports.addIncome = async (req, res) => {
    // console.log(req.body);

    const { title, amount, category, description, date } = req.body;

    if (!title || !amount || !category || !description || !date) {
        return res.status(400).json({ message: "All fields are required" })
    }

    if (typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({ message: "Amount must be a positive number" });
    }

    try {
        const income = incomeSchema({
            title,
            amount,
            category,
            description,
            date,
        })
        console.log(income);

        await income.save();
        res.status(200).json({ message: "Income successfully" });

    } catch (e) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(e.message);
    }
}

// Get Method
exports.getIncome = async (req, res) => {
    try {
        const incomes = await incomeSchema.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (e) {
        res.status(400).json({ message: "404 Not Found" });
        console.error(e.message);
    }
}

// Update income (PUT)
exports.updateIncome = async (req, res) => {
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
        const updatedIncome = await incomeSchema.findByIdAndUpdate(
            id,
            { title, amount, category, description, date },
            { new: true, runValidators: true }
        );

        if (!updatedIncome) {
            return res.status(404).json({ message: "Income not found" });
        }

        res.status(200).json({ message: "Income updated successfully", updatedIncome });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete Method
exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);

    try {
        const deletedIncome = await incomeSchema.findByIdAndDelete(id);

        if (!deletedIncome) {
            return res.status(404).json({ message: "Income not found" });
        }

        res.status(200).json({ message: "Income deleted successfully" });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Internal Server Error, cannot be deleted" });
    }
}