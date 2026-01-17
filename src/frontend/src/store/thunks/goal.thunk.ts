import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/client";

export const fetchGoal = createAsyncThunk("meetings/fetchGoal", async () => {
    const response = await api.getGoal();
    return response.goal;
});

export const renewGoal = createAsyncThunk(
    "meetings/updateGoal",
    async (goal: number) => {
        await api.updateGoal(goal);
        return goal;
    },
);
