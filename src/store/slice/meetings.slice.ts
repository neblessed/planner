import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { InitialMeetingsStateType } from "../types/MeetingsStateType";
import type { MeetingType } from "../../types/MeetingType";
import type { SpendingType } from "../../types/SpendingType";
import { calculateBalance } from "../utils/calculateBalance";
import { initialMeetings, initialSpendings } from "../initial/inititialValues";

const initialMeetingsState: InitialMeetingsStateType = {
    meetings: initialMeetings,
    goal: 100000,
    balance: calculateBalance(53000, initialMeetings, initialSpendings),
    spendings: initialSpendings,
};

const meetingsSlice = createSlice({
    name: "meetingsSlice",
    initialState: initialMeetingsState,
    reducers: {
        setupGoal: (state, action: PayloadAction<number>) => {
            state.goal = action.payload;
        },
        addMeeting: (state, action: PayloadAction<MeetingType>) => {
            state.meetings.push(action.payload);
        },
        addSpending: (state, action: PayloadAction<SpendingType>) => {
            state.spendings.push(action.payload);

            state.balance = calculateBalance(
                53000,
                state.meetings,
                state.spendings
            );
        },
    },
});

export const { setupGoal, addMeeting, addSpending } = meetingsSlice.actions;
export default meetingsSlice.reducer;
