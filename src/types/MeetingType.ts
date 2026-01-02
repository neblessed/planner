import type { StatusType } from "./StatusType";

export type MeetingType = {
    id: number;
    /** ФИО заказчика **/
    person: string;
    /** Место встречи **/
    location?: string;
    /** Дата встречи **/
    date: Date;
    /** Ссылки **/
    links: {
        /** Telegram заказчика **/
        telegram: string;
        /** Ссылка на портфолио с выполненной работой **/
        wfolio?: string;
    };
    status: StatusType;
};
