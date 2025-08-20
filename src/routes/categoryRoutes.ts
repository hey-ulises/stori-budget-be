import { Router } from "express";
import prisma from "../prisma/client.js";

const categoryRoutes = Router();

// Get all categories
categoryRoutes.get("/", async (req, res) => {
    // Date should be today, but since the data provided stops at 2024-10-29, Im using that date
    const now = new Date("2024-10-29");
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const categories = await prisma.category.findMany({
      include: {
        transactions: {
          where: {
            date: {
              gte: firstDayOfMonth,
              lt: firstDayOfNextMonth,
            },
          },
        },
      },
    });
    res.json(categories);
});

// Get category by id
categoryRoutes.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const category = await prisma.category.findUnique({
        where: { id },
        include: { transactions: true },
    });
    res.json(category);
});

// Create category
categoryRoutes.post("/", async (req, res) => {
    const { name, type } = req.body;
    const newCategory = await prisma.category.create({ data: { name, type } });
    res.status(201).json(newCategory);
});

// Update category
categoryRoutes.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { name, type } = req.body;
    const updatedCategory = await prisma.category.update({
        where: { id },
        data: { name, type },
    });
    res.json(updatedCategory);
});

// Delete category
categoryRoutes.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    await prisma.category.delete({ where: { id } });
    res.status(204).send();
});

export default categoryRoutes;
