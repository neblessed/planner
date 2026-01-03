import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { InitialMeetingsStateType } from "../types/MeetingsStateType";

const initialMeetingsState: InitialMeetingsStateType = {
    meetings: [
        {
            id: 1,
            person: "Vadim T.",
            date: new Date("2026-01-03T14:30:00Z"),
            links: { telegram: "https://t.me/neblessed" },
            status: "В обработке",
        },
        {
            id: 2,
            person: "Arnold S.",
            date: new Date("2026-01-04T15:30:00Z"),
            links: { telegram: "https://t.me/neblessed" },
            status: "В обработке",
        },
        {
            id: 3,
            person: "Jilia K.",
            date: new Date("2026-01-04T12:30:00Z"),
            links: { telegram: "https://t.me/neblessed" },
            status: "В обработке",
        },
    ],
    goal: 100000,
    balance: {
        total: 53000,
        spendings: -3753,
    },
};

const meetingsSlice = createSlice({
    name: "meetingsSlice",
    initialState: initialMeetingsState,
    reducers: {
        setupGoal: (state, action: PayloadAction<number>) => {
            state.goal = action.payload;
        },
    },
});

export const { setupGoal } = meetingsSlice.actions;
export default meetingsSlice.reducer;
