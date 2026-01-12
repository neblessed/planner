import express from "express";

const app = express();

app.listen(3000, () => {
    console.log(`🚀 Server running on http://localhost:${3000}`);
    console.log(`📁 API endpoints available at http://localhost:${3000}/api`);
});
