import { Request, Response } from "express";
import { MeetingRepository } from "../database/repositories/meetings.repository";
import { CreateMeetingDTO } from "../database/types/CreateMeetingDTO";
import { UpdateMeetingDTO } from "../database/types/UpdateMeetingDTO";

export class MeetingsController {
    static async getAllMeetings(_req: Request, res: Response): Promise<void> {
        try {
            const meetings = await MeetingRepository.getAll();
            res.status(200).json(meetings);
        } catch (error) {
            res.status(500).json({
                error: "Ошибка при получении встреч",
                details:
                    error instanceof Error
                        ? error.message
                        : "Неизвестная ошибка",
            });
        }
    }

    static async getMeetingById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ error: "Некорректный ID" });
                return;
            }

            const meeting = await MeetingRepository.getById(id);

            if (!meeting) {
                res.status(404).json({ error: "Встреча не найдена" });
                return;
            }

            res.status(200).json(meeting);
        } catch (error) {
            res.status(500).json({
                error: "Ошибка при получении встречи",
                details:
                    error instanceof Error
                        ? error.message
                        : "Неизвестная ошибка",
            });
        }
    }

    // POST /api/meetings - создать новую встречу
    static async createMeeting(req: Request, res: Response): Promise<void> {
        try {
            const data: CreateMeetingDTO = req.body;

            // Валидация
            if (
                !data.person ||
                !data.location ||
                !data.date ||
                !data.telegram ||
                !data.status
            ) {
                res.status(400).json({
                    error: "Отсутствуют обязательные поля",
                    required: [
                        "person",
                        "location",
                        "date",
                        "telegram",
                        "status",
                    ],
                });
                return;
            }

            await MeetingRepository.create(data);
            res.status(201).json({
                message: "Встреча создана",
            });
        } catch (error) {
            res.status(500).json({
                error: "Ошибка при создании встречи",
                details:
                    error instanceof Error
                        ? error.message
                        : "Неизвестная ошибка",
            });
        }
    }

    static async updateMeeting(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ error: "Некорректный ID" });
                return;
            }

            const data: UpdateMeetingDTO = {
                ...req.body,
                id,
            };

            const updated = await MeetingRepository.update(id, data);

            if (!updated) {
                res.status(404).json({
                    error: "Встреча не найдена или не обновлена",
                });
                return;
            }

            res.status(200).json({ message: "Встреча обновлена" });
        } catch (error) {
            res.status(500).json({
                error: "Ошибка при обновлении встречи",
                details:
                    error instanceof Error
                        ? error.message
                        : "Неизвестная ошибка",
            });
        }
    }

    static async deleteMeeting(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                res.status(400).json({ error: "Некорректный ID" });
                return;
            }

            const deleted = await MeetingRepository.delete(id);

            if (!deleted) {
                res.status(404).json({ error: "Встреча не найдена" });
                return;
            }

            res.status(200).json({ message: "Встреча удалена" });
        } catch (error) {
            res.status(500).json({
                error: "Ошибка при удалении встречи",
                details:
                    error instanceof Error
                        ? error.message
                        : "Неизвестная ошибка",
            });
        }
    }
}
