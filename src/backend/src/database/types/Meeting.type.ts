export type Meeting = {
	id: number;
	personId: number;
	location: string;
	date: string;
	deadlineDate?: string;
	wfolio?: string;
	status: string;
	comment?: string;
	amount?: number;
};
