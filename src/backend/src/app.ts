import express from "express";
import meetingsRouter from "./routes/meetings.routes";
import spendingsRouter from "./routes/spendings.routes";
import goalRouter from "./routes/goal.routes";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);
app.use(express.json());
app.use("/api/meetings", meetingsRouter);
app.use("/api/spendings", spendingsRouter);
app.use("/api/goal", goalRouter);

export { app };
