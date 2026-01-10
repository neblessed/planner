import Database from "better-sqlite3";

export class MeetingsController {
    private db;

    constructor() {
        this.db = new Database("../meetings.db");
        this.initTables();
    }

    private initTables() {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS goal (
                id INTEGER PRIMARY KEY CHECK (id = 1),
                goal INTEGER NOT NULL
            );
            
            CREATE TABLE IF NOT EXISTS meetings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                person TEXT NOT NULL,
                location TEXT NOT NULL,
                date TEXT NOT NULL,
                deadlineDate TEXT,
                telegram TEXT NOT NULL,
                wfolio TEXT,
                status TEXT NOT NULL CHECK (status IN ('Назначено', 'Проведено', 'Ждёт обработки', 'В обработке', 'Сдано')),
                comment TEXT,
                amount INTEGER
            );
            
            CREATE TABLE IF NOT EXISTS spendings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                spending TEXT NOT NULL,
                amount INTEGER NOT NULL,
                date TEXT NOT NULL
            );
        `);
    }
}
