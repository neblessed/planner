import { RunResult, Statement } from "better-sqlite3";
import { db } from "../db";
import type { Meeting } from "../types/Meeting.type";

export class MeetingRepository {
    // Возвращает массив встреч
    static getAllMeetings(): Meeting[] {
        return db.prepare("SELECT * FROM meetings").all() as Meeting[];
    }

    // Получить одну встречу по ID
    static getMeetingById(id: number): Meeting | undefined {
        return db
            .prepare("SELECT * FROM meetings WHERE id = ?")
            .get(id) as Meeting;
    }

    // Создать встречу
    static createMeeting(meeting: Omit<Meeting, "id">) {
        const stmt = db.prepare(`
            INSERT INTO meetings (person, location, date, deadlineDate, telegram, wfolio, status, comment, amount)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        return stmt.run(
            meeting.person,
            meeting.location,
            meeting.date,
            meeting.deadlineDate || null,
            meeting.telegram,
            meeting.wfolio || null,
            meeting.status,
            meeting.comment || null,
            meeting.amount || null
        );
    }

    static updateMeeting(
        id: number,
        data: Partial<Omit<Meeting, "id">>
    ): boolean {
        // Проверяем существует ли встреча
        const exists = db
            .prepare("SELECT 1 FROM meetings WHERE id = ?")
            .get(id);
        if (!exists) {
            return false;
        }

        // Обрабатываем структуру данных
        const updateFields: Record<string, any> = {};

        // Копируем поля из data
        Object.entries(data).forEach(([key, value]) => {
            if (key !== "id") {
                if (key === "links") {
                    // Разбираем объект links
                    updateFields.telegram = value?.telegram;
                    updateFields.wfolio = value?.wfolio || null;
                } else {
                    updateFields[key] = value;
                }
            }
        });

        if (Object.keys(updateFields).length === 0) {
            return false; // Нечего обновлять
        }

        // Формируем SQL запрос
        const setClause = Object.keys(updateFields)
            .map((key) => `${key} = ?`)
            .join(", ");

        const values = Object.values(updateFields);
        values.push(id);

        const sql = `UPDATE meetings SET ${setClause} WHERE id = ?`;
        const stmt: Statement = db.prepare(sql);

        try {
            const result: RunResult = stmt.run(...values);
            return result.changes > 0;
        } catch (error) {
            console.error("Error updating meeting:", error);
            return false;
        }
    }
}
