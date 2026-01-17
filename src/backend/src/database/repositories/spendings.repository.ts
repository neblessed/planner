import { db } from "../db";
import type { Spending } from "../types/Spending.type";

export class SpendingRepository {
    /**
     * Получить все траты
     * @returns
     */
    static getAllSpendings(): Spending[] {
        return db.prepare("SELECT * FROM spendings").all() as Spending[];
    }

    /**
     * Получить трату по id
     * @param id - идентификатор траты
     * @returns
     */
    static getSpendingById(id: number): Spending | undefined {
        return db
            .prepare("SELECT * FROM spendings WHERE id = ?")
            .get(id) as Spending;
    }

    /**
     * Создать трату
     * @param spending - трата
     * @returns
     */
    static createSpending(spending: Omit<Spending, "id">) {
        const stmt = db.prepare(`
            INSERT INTO spendings (spending, amount, date)
            VALUES (?, ?, ?)
        `);

        return stmt.run(spending.spending, spending.amount, spending.date);
    }

    /**
     * Удалить трату по id
     * @param id - идентификатор траты
     * @returns
     */
    static deleteSpending(id: number) {
        const stmt = db.prepare(`DELETE FROM spendings WHERE id = ?`);

        return stmt.run(id);
    }
}
