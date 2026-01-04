import type { StatusType } from "./StatusType";

export type MeetingType = {
    id: number;
    /** ФИО клиента **/
    person: string;
    /** Место встречи **/
    location: string;
    /** Дата встречи **/
    date: Date | null;
    /** Ссылки **/
    links: {
        /** Telegram клиента **/
        telegram: string;
        /** Ссылка на портфолио с выполненной работой **/
        wfolio?: string;
    };
    status: StatusType;
    /** Комментарий к записи */
    comment?: string;
};
