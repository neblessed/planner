import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/client";
import { SpendingType } from "../../types/SpendingType";

export const fetchAllSpendings = createAsyncThunk(
    "meetings/fetchSpendings",
    async () => {
        const response = await api.getSpendings();
        return response;
    },
);

export const createNewSpending = createAsyncThunk(
    "meetings/createSpending",
    async (spendingData: Omit<SpendingType, "id">) => {
        const response = await api.createSpending(spendingData);
        console.log("response", response);
        return response;
    },
);

export const deleteExistedSpending = createAsyncThunk(
    "meetings/deleteSpending",
    async (id: number) => {
        await api.deleteSpending(id);
        return id;
    },
);
