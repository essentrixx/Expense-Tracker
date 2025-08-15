const { addIncome, getIncome, deleteIncome, updateIncome } = require("../controllers/income");
const { addExpense, getExpense, updateExpense, deleteExpense } = require("../controllers/expense");

const router = require("express").Router();

// Income
router.post("/addincome", addIncome);
router.get("/getincome", getIncome);
router.put("/putincome/:id", updateIncome);
router.delete("/deleteincome/:id", deleteIncome);

// Expense
router.post("/addexpense", addExpense);
router.get("/getexpense", getExpense);
router.put("/putexpense/:id", updateExpense);
router.delete("/deleteexpense/:id", deleteExpense);

module.exports = router;