import { createAsyncThunk } from "@reduxjs/toolkit";
import { MeetingType } from "../../types/MeetingType";
import { api } from "../../api/client";

export const fetchMeetings = createAsyncThunk(
    "meetings/fetchMeetings",
    async () => {
        const response = await api.getMeetings();

        return (response as any[]).map((resp) => {
            return {
                ...resp,
                links: {
                    telegram: resp.telegram,
                    wfolio: resp.wfolio,
                },
            };
        });
    },
);

export const createNewMeeting = createAsyncThunk(
    "meetings/createMeeting",
    async (meetingData: Omit<MeetingType, "id">) => {
        const response = await api.createMeeting(meetingData);
        return response;
    },
);

export const updateExistedMeeting = createAsyncThunk(
    "meetings/updateMeeting",
    async ({ id, ...data }: Partial<MeetingType> & { id: number }) => {
        await api.updateMeeting(id, data);
        return { id, ...data };
    },
);

export const deleteExistedMeeting = createAsyncThunk(
    "meetings/deleteMeeting",
    async (id: number) => {
        await api.deleteMeeting(id);
        return id;
    },
);

export const fetchMeeting = createAsyncThunk(
    "meetings/fetchMeeting",
    async (id: number) => {
        const response = await api.getMeeting(id);
        return response;
    },
);
