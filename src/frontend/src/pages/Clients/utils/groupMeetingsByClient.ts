import { MeetingType } from "../../../types/MeetingType";

/**
 * Группирует встречи по пользователям
 */
export const groupMeetingsByClient = (
    meetings: MeetingType[],
): MeetingType[][] => {
    const meetingsByUser = new Map<string, MeetingType[]>();

    for (const meeting of meetings) {
        if (!meetingsByUser.has(meeting.telegram)) {
            const clientMeetings = meetings.filter(
                (m) => m.telegram === meeting.telegram,
            );
            meetingsByUser.set(meeting.telegram, clientMeetings);
        }
    }

    return Array.from(meetingsByUser.values());
};
