export type Meeting = {
    id: number;
    person: string;
    location: string;
    date: string;
    deadlineDate?: string;
    telegram: string;
    wfolio?: string;
    status: string;
    comment?: string;
    amount?: number;
};
