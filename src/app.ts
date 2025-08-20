import express from "express";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import transactionsRoutes from "./routes/transactionsRoutes.js";
import kpiRoutes from "./routes/kpiRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/transactions", transactionsRoutes);
app.use("/kpis", kpiRoutes);

export default app;
