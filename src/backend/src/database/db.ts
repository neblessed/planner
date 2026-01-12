import Database from "better-sqlite3";

const db: Database.Database = new Database("../planner.db", {
    verbose: console.log,
});

export { db };
