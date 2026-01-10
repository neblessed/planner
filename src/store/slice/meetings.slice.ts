import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { InitialMeetingsStateType } from "../types/MeetingsStateType";
import type { MeetingType } from "../../types/MeetingType";
import type { SpendingType } from "../../types/SpendingType";
import { calculateBalance } from "../utils/calculateBalance";
import { initialMeetings, initialSpendings } from "../initial/inititialValues";

const initialMeetingsState: InitialMeetingsStateType = {
    meetings: initialMeetings,
    goal: 100000,
    balance: calculateBalance(initialMeetings, initialSpendings),
    spendings: initialSpendings,
};

type OptionalMeetingType = Partial<MeetingType>;

const meetingsSlice = createSlice({
    name: "meetingsSlice",
    initialState: initialMeetingsState,
    reducers: {
        setupGoal: (state, action: PayloadAction<number>) => {
            state.goal = action.payload;
        },
        addMeeting: (state, action: PayloadAction<MeetingType>) => {
            state.meetings.push(action.payload);

            state.balance = calculateBalance(state.meetings, state.spendings);
        },
        addSpending: (state, action: PayloadAction<SpendingType>) => {
            state.spendings.push(action.payload);

            state.balance = calculateBalance(state.meetings, state.spendings);
        },
        updateMeeting: (state, action: PayloadAction<OptionalMeetingType>) => {
            const id = action.payload.id;
            const meeting = state.meetings.find((meeting) => meeting.id === id);

            if (meeting) {
                const updated = {
                    ...meeting,
                    ...action.payload,
                };

                state.meetings = state.meetings.map((meeting) => {
                    if (meeting.id === id) {
                        return updated;
                    }

                    return meeting;
                });

                state.balance = calculateBalance(
                    state.meetings,
                    state.spendings
                );
            }
        },
        deleteMeeting: (state, action: PayloadAction<number>) => {
            state.meetings = state.meetings.filter(
                (meeting) => meeting.id !== action.payload
            );

            state.balance = calculateBalance(state.meetings, state.spendings);
        },
    },
});

export const {
    setupGoal,
    addMeeting,
    addSpending,
    updateMeeting,
    deleteMeeting,
} = meetingsSlice.actions;
export default meetingsSlice.reducer;
