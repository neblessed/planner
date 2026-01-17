import { db } from "../db";

export class GoalRepository {
    /**
     * Обновить цель
     * @param goal - значение цели
     */
    static renew(goal: number) {
        db.prepare("UPDATE goal SET goal = ? WHERE id = 1").run(goal);
    }

    /**
     * Получить цель
     * @returns
     */
    static get() {
        const data = db.prepare("SELECT * FROM goal LIMIT 1").all();

        return data;
    }
}
