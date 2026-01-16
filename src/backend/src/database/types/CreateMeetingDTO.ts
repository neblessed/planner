import { Meeting } from "./Meeting.type";

export type CreateMeetingDTO = Omit<Meeting, "id">;
