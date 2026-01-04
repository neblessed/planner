import type { MeetingType } from "../../types/MeetingType";
import type { SpendingType } from "../../types/SpendingType";

export const initialMeetings: MeetingType[] = [
    {
        id: 1,
        person: "Vadim T.",
        date: "2026-01-04T14:30:00Z",
        links: { telegram: "https://t.me/neblessed" },
        status: "В обработке",
        location: "Студия",
    },
    {
        id: 2,
        person: "Arnold S.",
        date: "2026-01-05T15:30:00Z",
        links: { telegram: "https://t.me/neblessed" },
        status: "В обработке",
        location: "Студия",
    },
    {
        id: 3,
        person: "Jilia K.",
        date: "2026-01-05T12:30:00Z",
        links: { telegram: "https://t.me/neblessed" },
        status: "В обработке",
        location: "Студия",
    },
];

export const initialSpendings: SpendingType[] = [
    {
        id: 1,
        spending: "Оборудование",
        date: "2026-01-04T14:30:00Z",
        amount: 1370,
    },
];
