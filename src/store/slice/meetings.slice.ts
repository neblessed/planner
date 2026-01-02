import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { InitialMeetingsStateType } from "../types/MeetingsStateType";

const initialMeetingsState: InitialMeetingsStateType = {
    meetings: [],
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
