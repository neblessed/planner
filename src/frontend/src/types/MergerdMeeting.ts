import { StatusType } from './StatusType';

export type MergedMeeting = {
	id: number;
	/** Имя клиента **/
	person: string;
	/** Место встречи **/
	location: string;
	/** Дата встречи **/
	date: string;
	/** Дата дедлайна обработки */
	deadlineDate?: string;
	/** Ссылка на портфолио с выполненной работой **/
	wfolio?: string;
	telegram: string;
	status: StatusType;
	/** Комментарий к записи */
	comment?: string;
	/**Стоимость заказа */
	amount?: number;
};
