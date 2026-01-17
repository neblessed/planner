import { app } from "./app";
import { initDatabase } from "./database/db";

const port = process.env.PORT ?? 3000;

initDatabase();

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
