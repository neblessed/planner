import type { MeetingType } from "../../types/MeetingType";

export type InitialMeetingsStateType = {
    meetings: MeetingType[];
    goal: number;
    balance: {
        total: number;
        spendings: number;
    };
};
