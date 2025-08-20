import { Router } from "express";
import prisma from "../prisma/client.js";
import type { TransactionWithCategory } from "../types/models.js";

const kpiRoutes = Router();

kpiRoutes.get("/", async (req, res) => {
  try {
    // Date should be today, but since the data provided stops at 2024-10-29, Im using that date
    const now = new Date("2024-10-29");
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const allTransactions: TransactionWithCategory[] = await prisma.transaction.findMany({ include: { category: true } });

    const currentBalance = allTransactions.reduce((acc, t) => acc + t.amount, 0);

    const monthlyTransactions = allTransactions.filter(
      t => t.date >= firstDayOfMonth && t.date <= lastDayOfMonth
    );

    const monthlyIncome = monthlyTransactions
      .filter(t => t.category.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);

    const monthlyExpenses = monthlyTransactions
      .filter(t => t.category.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);

    res.json({
      currentBalance,
      monthlyIncome,
      monthlyExpenses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default kpiRoutes;