import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { InitialMeetingsStateType } from "../types/MeetingsStateType";

const initialMeetingsState: InitialMeetingsStateType = {
    meetings: [
        {
            id: 1,
            person: "Vadim T.",
            date: new Date("02/01/2026"),
            links: { telegram: "https://t.me/neblessed" },
            status: "В работе",
        },
        {
            id: 2,
            person: "Arnold S.",
            date: new Date("01/01/2026"),
            links: { telegram: "https://t.me/neblessed" },
            status: "В работе",
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
