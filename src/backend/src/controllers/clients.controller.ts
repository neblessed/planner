import { Request, Response } from "express";
import { ClientType } from "../database/types/Client.type";
import { ClientsRepository } from "../database/repositories/clients.repository";

// DTO для создания клиента (без id)
type CreateClientDTO = Omit<ClientType, "id">;

// DTO для обновления клиента (частичное обновление)
type UpdateClientDTO = Partial<Omit<ClientType, "id">>;

export class ClientsController {
    /**
     * Создание нового клиента
     */
    static async createClient(req: Request, res: Response): Promise<void> {
        try {
            const data: CreateClientDTO = req.body;

            // Валидация обязательных полей
            if (!data.name || !data.telegram) {
                res.status(400).json({
                    error: "Отсутствуют обязательные поля",
                    required: ["name", "telegram"],
                    received: {
                        name: data.name,
                        telegram: data.telegram,
                        feedback: data.feedback,
                        note: data.note,
                    },
                });
                return;
            }

            // Валидация типов данных
            if (typeof data.name !== "string" || data.name.trim() === "") {
                res.status(400).json({
                    error: "Некорректное имя клиента",
                    field: "name",
                    value: data.name,
                    expected: "непустая строка",
                });
                return;
            }

            if (
                typeof data.telegram !== "string" ||
                data.telegram.trim() === ""
            ) {
                res.status(400).json({
                    error: "Некорректный telegram",
                    field: "telegram",
                    value: data.telegram,
                    expected: "непустая строка",
                });
                return;
            }

            // Валидация опциональных полей
            if (
                data.feedback !== undefined &&
                typeof data.feedback !== "boolean"
            ) {
                res.status(400).json({
                    error: "Некорректное значение feedback",
                    field: "feedback",
                    value: data.feedback,
                    expected: "boolean (true/false)",
                });
                return;
            }

            if (data.note !== undefined && typeof data.note !== "string") {
                res.status(400).json({
                    error: "Некорректная заметка",
                    field: "note",
                    value: data.note,
                    expected: "string",
                });
                return;
            }

            // Подготавливаем данные для создания
            const clientData: CreateClientDTO = {
                name: data.name.trim(),
                telegram: data.telegram.trim(),
                feedback: data.feedback ?? false,
                note: data.note?.trim() || "",
            };

            // Создаем клиента через репозиторий
            const result = ClientsRepository.createClient(clientData);

            // Обрабатываем результат
            if (!result.created && result.client) {
                res.status(200).json({
                    message: result.message || "Клиент уже существует",
                    client: result.client,
                    alreadyExists: true,
                });
                return;
            }

            if (result.created && result.client) {
                res.status(201).json({
                    message: "Клиент успешно создан",
                    client: result.client,
                });
                return;
            }

            // Если что-то пошло не так
            res.status(500).json({
                error: "Не удалось создать клиента",
                details: "Неизвестная ошибка",
            });
        } catch (error) {
            console.error("Ошибка при создании клиента:", error);
            res.status(500).json({
                error: "Ошибка при создании клиента",
                details:
                    error instanceof Error
                        ? error.message
                        : "Неизвестная ошибка",
            });
        }
    }

    /**
     * Обновление данных клиента
     */
    static async updateClient(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            // Валидация ID
            if (isNaN(id) || id <= 0) {
                res.status(400).json({
                    error: "Неверный идентификатор клиента",
                    id: req.params.id,
                    expected: "положительное число",
                });
                return;
            }

            const data: UpdateClientDTO = req.body;

            // Проверяем, что есть хотя бы одно поле для обновления
            const hasUpdates = Object.keys(data).some(
                (key) =>
                    key !== "id" &&
                    data[key as keyof UpdateClientDTO] !== undefined,
            );

            if (!hasUpdates) {
                res.status(400).json({
                    error: "Нет данных для обновления",
                    received: data,
                    hint: "Укажите хотя бы одно поле для обновления: name, telegram, feedback или note",
                });
                return;
            }

            // Валидация полей, если они переданы
            if (
                data.name !== undefined &&
                (typeof data.name !== "string" || data.name.trim() === "")
            ) {
                res.status(400).json({
                    error: "Некорректное имя клиента",
                    field: "name",
                    value: data.name,
                    expected: "непустая строка",
                });
                return;
            }

            if (
                data.telegram !== undefined &&
                (typeof data.telegram !== "string" ||
                    data.telegram.trim() === "")
            ) {
                res.status(400).json({
                    error: "Некорректный telegram",
                    field: "telegram",
                    value: data.telegram,
                    expected: "непустая строка",
                });
                return;
            }

            if (
                data.feedback !== undefined &&
                typeof data.feedback !== "boolean"
            ) {
                res.status(400).json({
                    error: "Некорректное значение feedback",
                    field: "feedback",
                    value: data.feedback,
                    expected: "boolean (true/false)",
                });
                return;
            }

            if (data.note !== undefined && typeof data.note !== "string") {
                res.status(400).json({
                    error: "Некорректная заметка",
                    field: "note",
                    value: data.note,
                    expected: "string",
                });
                return;
            }

            // Подготавливаем данные для обновления
            const updateData: UpdateClientDTO = {};

            if (data.name !== undefined) updateData.name = data.name.trim();
            if (data.telegram !== undefined)
                updateData.telegram = data.telegram.trim();
            if (data.feedback !== undefined)
                updateData.feedback = data.feedback;
            if (data.note !== undefined) updateData.note = data.note.trim();

            // Обновляем клиента
            const result = ClientsRepository.updateClient(id, updateData);

            if (!result.success) {
                res.status(404).json({
                    error: "Клиент не найден или нет данных для обновления",
                    clientId: id,
                });
                return;
            }

            // Успешное обновление
            res.status(200).json({
                message: "Клиент успешно обновлен",
                client: result.client,
            });
        } catch (error) {
            console.error("Ошибка при обновлении клиента:", error);

            // Обработка ошибки уникальности telegram
            if (
                error instanceof Error &&
                error.message.includes("уже используется")
            ) {
                res.status(409).json({
                    error: "Конфликт данных",
                    details: error.message,
                });
                return;
            }

            res.status(500).json({
                error: "Ошибка при обновлении клиента",
                details:
                    error instanceof Error
                        ? error.message
                        : "Неизвестная ошибка",
            });
        }
    }

    /**
     * Получение клиента по ID
     */
    static async getClientById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id) || id <= 0) {
                res.status(400).json({
                    error: "Неверный идентификатор клиента",
                    id: req.params.id,
                    expected: "положительное число",
                });
                return;
            }

            const client = ClientsRepository.getClientById(id);

            if (!client) {
                res.status(404).json({
                    error: "Клиент не найден",
                    clientId: id,
                });
                return;
            }

            res.status(200).json(client);
        } catch (error) {
            console.error("Ошибка при получении клиента:", error);
            res.status(500).json({
                error: "Ошибка при получении клиента",
                details:
                    error instanceof Error
                        ? error.message
                        : "Неизвестная ошибка",
            });
        }
    }

    /**
     * Получение клиента по Telegram
     */
    static async getClientByTelegram(
        req: Request,
        res: Response,
    ): Promise<void> {
        try {
            const telegram = req.params.telegram;

            if (
                !telegram ||
                typeof telegram !== "string" ||
                telegram.trim() === ""
            ) {
                res.status(400).json({
                    error: "Не указан telegram",
                    telegram: telegram,
                });
                return;
            }

            const client = ClientsRepository.getClientByTelegram(
                telegram.trim(),
            );

            if (!client) {
                res.status(404).json({
                    error: "Клиент не найден",
                    telegram: telegram,
                });
                return;
            }

            res.status(200).json(client);
        } catch (error) {
            console.error("Ошибка при получении клиента по telegram:", error);
            res.status(500).json({
                error: "Ошибка при получении клиента",
                details:
                    error instanceof Error
                        ? error.message
                        : "Неизвестная ошибка",
            });
        }
    }

    /**
     * Получение всех клиентов
     */
    static async getAllClients(req: Request, res: Response): Promise<void> {
        try {
            const clients = ClientsRepository.getAllClients();
            res.status(200).json({
                count: clients.length,
                clients: clients,
            });
        } catch (error) {
            console.error("Ошибка при получении клиентов:", error);
            res.status(500).json({
                error: "Ошибка при получении клиентов",
                details:
                    error instanceof Error
                        ? error.message
                        : "Неизвестная ошибка",
            });
        }
    }

    /**
     * Поиск клиентов
     */
    static async searchClients(req: Request, res: Response): Promise<void> {
        try {
            const query = req.query.q as string;

            if (!query || query.trim() === "") {
                res.status(400).json({
                    error: "Не указан поисковый запрос",
                    parameter: "q",
                    example: "/api/clients/search?q=Иван",
                });
                return;
            }

            const clients = ClientsRepository.searchClients(query.trim());

            res.status(200).json({
                query: query,
                count: clients.length,
                clients: clients,
            });
        } catch (error) {
            console.error("Ошибка при поиске клиентов:", error);
            res.status(500).json({
                error: "Ошибка при поиске клиентов",
                details:
                    error instanceof Error
                        ? error.message
                        : "Неизвестная ошибка",
            });
        }
    }

    /**
     * Удаление клиента
     */
    static async deleteClient(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            if (isNaN(id) || id <= 0) {
                res.status(400).json({
                    error: "Неверный идентификатор клиента",
                    id: req.params.id,
                    expected: "положительное число",
                });
                return;
            }

            const result = ClientsRepository.deleteClient(id);

            if (!result.success) {
                res.status(404).json({
                    error: result.message || "Клиент не найден",
                    clientId: id,
                });
                return;
            }

            res.status(200).json({
                message: result.message || "Клиент успешно удален",
                clientId: id,
            });
        } catch (error) {
            console.error("Ошибка при удалении клиента:", error);
            res.status(500).json({
                error: "Ошибка при удалении клиента",
                details:
                    error instanceof Error
                        ? error.message
                        : "Неизвестная ошибка",
            });
        }
    }
}
