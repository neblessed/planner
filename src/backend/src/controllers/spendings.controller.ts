import { Request, Response } from "express";
import { SpendingRepository } from "../database/repositories/spendings.repository";

export class SpendingsController {
    static async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const spendings = await SpendingRepository.getAllSpendings();
            res.json(spendings);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ error: "Некорректный ID" });
                return;
            }

            const spending = await SpendingRepository.getSpendingById(id);

            if (!spending) {
                res.status(404).json({ error: "Трата не найдена" });
                return;
            }

            res.status(200).json(spending);
        } catch (error) {
            res.status(500).json({
                error: "Ошибка при получении траты",
                details:
                    error instanceof Error
                        ? error.message
                        : "Неизвестная ошибка",
            });
        }
    }

    static async create(req: Request, res: Response): Promise<void> {
        try {
            const { spending, amount, date } = req.body;

            if (!spending || !amount || !date) {
                res.status(400).json({ error: "Missing required fields" });
                return;
            }

            await SpendingRepository.createSpending({
                spending,
                amount,
                date,
            });
            res.status(201).json({ message: "success" });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    static async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const deleted = await SpendingRepository.deleteSpending(id);

            if (!deleted) {
                res.status(404).json({ error: "Spending not found" });
                return;
            }

            res.json({ message: "Spending deleted" });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
