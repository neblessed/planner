import type { StatusType } from "./StatusType";

export type MeetingType = {
    id: number;
    /** ФИО клиента **/
    person: string;
    /** Место встречи **/
    location: string;
    /** Дата встречи **/
    date: string;
    /** Дата дедлайна обработки */
    deadlineDate?: string;
    /** Telegram клиента **/
    telegram: string;
    /** Ссылка на портфолио с выполненной работой **/
    wfolio?: string;
    status: StatusType;
    /** Комментарий к записи */
    comment?: string;
    /**Стоимость заказа */
    amount?: number;
};
