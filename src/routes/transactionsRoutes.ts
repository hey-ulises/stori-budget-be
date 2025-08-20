import { Router } from "express";
import prisma from "../prisma/client.js";

const transactionsRoutes = Router();

// Get all transactions
transactionsRoutes.get("/", async (req, res) => {
  const transactions = await prisma.transaction.findMany({
    include: { category: true },
  });
  res.json(transactions);
});

// Get transaction by id
transactionsRoutes.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const transaction = await prisma.transaction.findUnique({
    where: { id },
    include: { category: true },
  });
  res.json(transaction);
});

// Create transaction
transactionsRoutes.post("/", async (req, res) => {
  const { date, amount, description, categoryId } = req.body;
  const newTransaction = await prisma.transaction.create({
    data: { date: new Date(date), amount, description, categoryId },
  });
  res.status(201).json(newTransaction);
});

// Update transaction
transactionsRoutes.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { date, amount, description, categoryId } = req.body;
  const updatedTransaction = await prisma.transaction.update({
    where: { id },
    data: { date: new Date(date), amount, description, categoryId },
  });
  res.json(updatedTransaction);
});

// Delete transaction
transactionsRoutes.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.transaction.delete({ where: { id } });
  res.status(204).send();
});

export default transactionsRoutes;
