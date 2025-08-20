import express from "express";
import { OpenAI } from "openai";
import prisma from "../prisma/client.js";

const adviceRoutes = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

adviceRoutes.get("/", async (req, res) => {
  try {
    // Date should be today, but since the data provided stops at 2024-10-29, Im using that date
    const now = new Date("2024-10-29");
    const firstDayTwoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const firstDayNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const transactions = await prisma.transaction.findMany({
      where: {
        date: {
          gte: firstDayTwoMonthsAgo,
          lt: firstDayNextMonth,
        },
      },
      include: { category: true },
      orderBy: { date: "desc" },
    });

    const prompt = `
    You are a financial assistant. Analyze the following user transactions from the last two months.
    Compare the previous month with the current one, focusing on expenses vs. income.
    Provide a short, clear, and actionable financial recommendation to help the user save money or manage it better.
    Data: ${JSON.stringify(transactions)}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const recommendation = completion.choices[0]?.message?.content || "No recommendation available.";

    res.json({ recommendation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate recommendation" });
  }
});

export default adviceRoutes;
