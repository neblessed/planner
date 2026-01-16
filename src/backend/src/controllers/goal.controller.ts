import { Request, Response } from "express";
import { GoalRepository } from "../database/repositories/goal.repository";

export class GoalController {
    static async renew(req: Request, res: Response): Promise<void> {
        try {
            const { goal } = req.body;

            await GoalRepository.renewGoal(Number(goal));
            res.status(201).json({ message: "Цель обновлена" });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
