import { Meeting } from "./Meeting.type";

export type UpdateMeetingDTO = Partial<Omit<Meeting, "id">>;
