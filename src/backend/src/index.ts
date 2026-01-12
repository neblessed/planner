import { app } from "./app";

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📁 API endpoints available at http://localhost:${port}/api`);
});
