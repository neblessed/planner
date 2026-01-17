import type { MeetingType } from "../../types/MeetingType";
import type { SpendingType } from "../../types/SpendingType";
import type { Balance } from "./BalanceType";

export type InitialMeetingsStateType = {
    meetings: MeetingType[];
    goal: number;
    balance: Balance | null;
    spendings: SpendingType[];
    loading: boolean;
    error: null | string;
};
