import express from "express";
import meetingsRouter from "./routes/meetings.routes";
import spendingsRouter from "./routes/spendings.routes";
import goalRouter from "./routes/goal.routes";

const app = express();

app.use(express.json());
app.use("/api/meetings", meetingsRouter);
app.use("/api/spendings", spendingsRouter);
app.use("/api/goal", goalRouter);

export { app };
