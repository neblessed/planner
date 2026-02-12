import { ClientType } from "../types/Client.type";
import { db } from "../db";

type CreateClientResult = {
    created: boolean;
    client?: ClientType;
    message?: string;
};

export class ClientsRepository {
    /**
     * Создание клиента с проверкой на существование
     */
    static createClient(client: Omit<ClientType, "id">): CreateClientResult {
        const existingClient = db
            .prepare(`SELECT id FROM clients WHERE telegram = ?`)
            .get(client.telegram) as { id: number };

        if (existingClient) {
            // Возвращаем существующего клиента
            const existing = this.getClientById(existingClient.id);
            return {
                created: false,
                client: existing || undefined,
                message: "Клиент уже существует",
            };
        }

        const stmt = db.prepare(`
            INSERT INTO clients (name, telegram, feedback, note)
            VALUES (?, ?, ?, ?)
        `);

        const result = stmt.run(
            client.name,
            client.telegram,
            client.feedback ? 1 : 0,
            client.note || "",
        );

        // Получаем созданного клиента
        const newClient = this.getClientById(Number(result.lastInsertRowid));

        return {
            created: true,
            client: newClient || undefined,
        };
    }

    /**
     * Изменение данных клиента
     */
    static updateClient(
        id: number,
        updates: Partial<Omit<ClientType, "id">>,
    ): { success: boolean; client?: ClientType } {
        // Сначала проверяем существование клиента
        const existingClient = this.getClientById(id);
        if (!existingClient) {
            return { success: false };
        }

        const sets: string[] = [];
        const values: any[] = [];

        if (updates.name !== undefined) {
            sets.push("name = ?");
            values.push(updates.name);
        }

        if (updates.telegram !== undefined) {
            // Проверяем уникальность telegram
            if (updates.telegram !== existingClient.telegram) {
                const telegramExists = db
                    .prepare(
                        `SELECT id FROM clients WHERE telegram = ? AND id != ?`,
                    )
                    .get(updates.telegram, id);

                if (telegramExists) {
                    throw new Error(
                        `Telegram ${updates.telegram} уже используется другим клиентом`,
                    );
                }
            }
            sets.push("telegram = ?");
            values.push(updates.telegram);
        }

        if (updates.feedback !== undefined) {
            sets.push("feedback = ?");
            values.push(updates.feedback ? 1 : 0);
        }

        if (updates.note !== undefined) {
            sets.push("note = ?");
            values.push(updates.note);
        }

        if (sets.length === 0) {
            return { success: false, client: existingClient };
        }

        values.push(id);

        const stmt = db.prepare(`
            UPDATE clients 
            SET ${sets.join(", ")}
            WHERE id = ?
        `);

        const result = stmt.run(...values);

        if (result.changes > 0) {
            const updatedClient = this.getClientById(id);
            return { success: true, client: updatedClient || undefined };
        }

        return { success: false, client: existingClient };
    }

    /**
     * Получает клиента по id
     */
    static getClientById(id: number): ClientType | null {
        const client = db
            .prepare(
                `
                SELECT 
                    id,
                    name,
                    telegram,
                    feedback,
                    note
                FROM clients 
                WHERE id = ?
            `,
            )
            .get(id) as any;

        if (!client) {
            return null;
        }

        return {
            ...client,
            feedback: Boolean(client.feedback),
        };
    }

    /**
     * Получает клиента по telegram
     */
    static getClientByTelegram(telegram: string): ClientType | null {
        const client = db
            .prepare(
                `
                SELECT 
                    id,
                    name,
                    telegram,
                    feedback,
                    note
                FROM clients 
                WHERE telegram = ?
            `,
            )
            .get(telegram) as any;

        if (!client) {
            return null;
        }

        return {
            ...client,
            feedback: Boolean(client.feedback),
        };
    }

    /**
     * Удаляет клиента по id
     */
    static deleteClient(id: number): { success: boolean; message?: string } {
        // Проверяем существование клиента перед удалением
        const existingClient = this.getClientById(id);
        if (!existingClient) {
            return {
                success: false,
                message: "Клиент не найден",
            };
        }

        const stmt = db.prepare(`DELETE FROM clients WHERE id = ?`);
        const result = stmt.run(id);

        return {
            success: result.changes > 0,
            message:
                result.changes > 0
                    ? "Клиент удален"
                    : "Не удалось удалить клиента",
        };
    }

    /**
     * Получает всех клиентов
     */
    static getAllClients(): ClientType[] {
        const clients = db
            .prepare(
                `
                SELECT 
                    id,
                    name,
                    telegram,
                    feedback,
                    note
                FROM clients 
                ORDER BY name
            `,
            )
            .all() as any[];

        return clients.map((client) => ({
            ...client,
            feedback: Boolean(client.feedback),
        }));
    }

    /**
     * Поиск клиентов по имени или telegram
     */
    static searchClients(query: string): ClientType[] {
        const searchTerm = `%${query}%`;
        const clients = db
            .prepare(
                `
                SELECT 
                    id,
                    name,
                    telegram,
                    feedback,
                    note
                FROM clients 
                WHERE name LIKE ? OR telegram LIKE ?
                ORDER BY name
            `,
            )
            .all(searchTerm, searchTerm) as any[];

        return clients.map((client) => ({
            ...client,
            feedback: Boolean(client.feedback),
        }));
    }
}
