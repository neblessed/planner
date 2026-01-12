export type Meeting = {
    id: number;
    person: string;
    location: string;
    date: string;
    deadlineDate?: string;
    links: {
        telegram: string;
        wfolio?: string;
    };
    status: string;
    comment?: string;
    amount?: number;
};
