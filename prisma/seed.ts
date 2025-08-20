import { PrismaClient } from "@prisma/client";
import data from "./transactions.json" with { type: "json" };

const prisma = new PrismaClient();

async function main() {
    const categories = [
        { name: "salary", type: "income" },
        { name: "rent", type: "expense" },
        { name: "groceries", type: "expense" },
        { name: "utilities", type: "expense" },
        { name: "dining", type: "expense" },
        { name: "transportation", type: "expense" },
        { name: "entertainment", type: "expense" },
        { name: "shopping", type: "expense" },
        { name: "healthcare", type: "expense" },
    ];
    // Name => Id
    const categoryMap: Record<string, number> = {}; 
  
    for (const cat of categories) {
        // Create categories
        const created = await prisma.category.create({ data: cat });
        categoryMap[cat.name] = created.id;
    }

    // Create transactions
    for (const t of data) {
        await prisma.transaction.create({
        data: {
            date: new Date(t.date),
            amount: t.amount,
            description: t.description,
            categoryId: categoryMap[t.category]!,
        },
        });
    }

    console.log("Database seeded");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
