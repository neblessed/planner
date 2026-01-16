import { db } from "../db";

export class GoalRepository {
    /**
     * Обновить цель
     * @param goal - значение цели
     */
    static renewGoal(goal: number) {
        db.prepare(`DELETE FROM goal`).run;
        db.prepare("INSERT INTO goal (goal) VALUES (?)").run(goal);
    }
}
