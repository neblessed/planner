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
        },
        addSpending: (state, action: PayloadAction<SpendingType>) => {
            state.spendings.push(action.payload);

            state.balance = calculateBalance(
                53000,
                state.meetings,
                state.spendings
            );
        },
        updateMeeting: (state, action: PayloadAction<OptionalMeetingType>) => {
            console.log(action);
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
            }
        },
    },
});

export const { setupGoal, addMeeting, addSpending, updateMeeting } =
    meetingsSlice.actions;
export default meetingsSlice.reducer;
