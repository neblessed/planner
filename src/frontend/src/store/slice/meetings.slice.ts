import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import type { InitialMeetingsStateType } from "../types/MeetingsStateType";
import type { MeetingType } from "../../types/MeetingType";
import type { SpendingType } from "../../types/SpendingType";
import { calculateBalance } from "../utils/calculateBalance";
import { api } from "../../api/client";
import {
    createNewMeeting,
    updateExistedMeeting,
    deleteExistedMeeting,
    fetchMeetings,
} from "../thunks/meeting.thunk";
import {
    createNewSpending,
    deleteExistedSpending,
    fetchAllSpendings,
} from "../thunks/spending.thunk";
import { fetchGoal, renewGoal } from "../thunks/goal.thunk";

const initialMeetingsState: InitialMeetingsStateType = {
    meetings: [],
    goal: 50,
    balance: null,
    spendings: [],
    loading: false,
    error: null,
};

type OptionalMeetingType = Partial<MeetingType>;

const meetingsSlice = createSlice({
    name: "meetingsSlice",
    initialState: initialMeetingsState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },

        optimisticallyAddMeeting: (
            state,
            action: PayloadAction<MeetingType>,
        ) => {
            state.meetings.push(action.payload);
            state.balance = calculateBalance(state.meetings, state.spendings);
        },
        optimisticallyAddSpending: (
            state,
            action: PayloadAction<SpendingType>,
        ) => {
            state.spendings.push(action.payload);
            state.balance = calculateBalance(state.meetings, state.spendings);
        },
    },
    extraReducers: (builder) => {
        builder
            // FETCH ALL DATA
            .addCase(fetchMeetings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMeetings.fulfilled, (state, action) => {
                state.loading = false;

                state.meetings = action.payload;
                state.balance = calculateBalance(
                    state.meetings,
                    state.spendings,
                );
            })
            .addCase(fetchMeetings.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || "Failed to fetch meetings";
            })

            .addCase(fetchAllSpendings.fulfilled, (state, action) => {
                state.spendings = action.payload;
                state.balance = calculateBalance(
                    state.meetings,
                    state.spendings,
                );
            })
            .addCase(fetchAllSpendings.rejected, (state, action) => {
                state.error =
                    action.error.message || "Failed to fetch spendings";
            })

            .addCase(fetchGoal.fulfilled, (state, action) => {
                state.goal = action.payload;
            })
            .addCase(fetchGoal.rejected, (state, action) => {
                state.error = action.error.message || "Failed to fetch goal";
            })

            // MEETINGS
            .addCase(createNewMeeting.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNewMeeting.fulfilled, (state, action) => {
                state.loading = false;
                state.meetings.push(action.payload);
                state.balance = calculateBalance(
                    state.meetings,
                    state.spendings,
                );
            })
            .addCase(createNewMeeting.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || "Failed to create meeting";
            })

            .addCase(updateExistedMeeting.fulfilled, (state, action) => {
                const index = state.meetings.findIndex(
                    (m) => m.id === action.payload.id,
                );
                if (index !== -1) {
                    state.meetings[index] = {
                        ...state.meetings[index],
                        ...action.payload,
                    };
                    state.balance = calculateBalance(
                        state.meetings,
                        state.spendings,
                    );
                }
            })
            .addCase(updateExistedMeeting.rejected, (state, action) => {
                state.error =
                    action.error.message || "Failed to update meeting";
            })

            .addCase(deleteExistedMeeting.fulfilled, (state, action) => {
                state.meetings = state.meetings.filter(
                    (m) => m.id !== action.payload,
                );
                state.balance = calculateBalance(
                    state.meetings,
                    state.spendings,
                );
            })
            .addCase(deleteExistedMeeting.rejected, (state, action) => {
                state.error =
                    action.error.message || "Failed to delete meeting";
            })

            // SPENDINGS
            .addCase(createNewSpending.fulfilled, (state, action) => {
                state.spendings.push(action.payload);
                state.balance = calculateBalance(
                    state.meetings,
                    state.spendings,
                );
            })
            .addCase(createNewSpending.rejected, (state, action) => {
                state.error =
                    action.error.message || "Failed to create spending";
            })

            .addCase(deleteExistedSpending.fulfilled, (state, action) => {
                state.spendings = state.spendings.filter(
                    (s) => s.id !== action.payload,
                );
                state.balance = calculateBalance(
                    state.meetings,
                    state.spendings,
                );
            })
            .addCase(deleteExistedSpending.rejected, (state, action) => {
                state.error =
                    action.error.message || "Failed to delete spending";
            })

            // GOAL
            .addCase(renewGoal.fulfilled, (state, action) => {
                state.goal = action.payload;
            })
            .addCase(renewGoal.rejected, (state, action) => {
                state.error = action.error.message || "Failed to update goal";
            });
    },
});

export const {
    clearError,
    optimisticallyAddMeeting,
    optimisticallyAddSpending,
} = meetingsSlice.actions;
export default meetingsSlice.reducer;
