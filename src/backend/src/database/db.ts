import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(__dirname, "../../planner.db");

const db: Database.Database = new Database(DB_PATH);

export const initDatabase = (): void => {
    try {
        // Таблица встреч
        db.exec(`
            CREATE TABLE IF NOT EXISTS meetings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                person TEXT NOT NULL,
                location TEXT NOT NULL,
                date TEXT NOT NULL,
                deadlineDate TEXT,
                telegram TEXT NOT NULL,
                wfolio TEXT,
                status TEXT NOT NULL,
                comment TEXT,
                amount INTEGER
            );
        `);

        // Таблица расходов
        db.exec(`
            CREATE TABLE IF NOT EXISTS spendings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                spending TEXT NOT NULL,
                amount INTEGER NOT NULL,
                date TEXT NOT NULL
            );
        `);

        // Таблица цели
        db.exec(`
            CREATE TABLE IF NOT EXISTS goal (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                goal INTEGER NOT NULL DEFAULT 0
            );
            INSERT OR IGNORE INTO goal (id, goal) VALUES (1, 0);
        `);

        db.exec(`
            CREATE TABLE IF NOT EXISTS clients (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                telegram TEXT NOT NULL UNIQUE,
                feedback INTEGER NOT NULL DEFAULT 0,
                note TEXT DEFAULT ''
            );
        `);

        console.log("✅ Database initialized");
    } catch (error) {
        console.error("❌ Database init error:", error);
        throw error;
    }
};

export { db };
