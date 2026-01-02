import type { MeetingType } from "../../../types/MeetingType";

type SeparatedMeetings = {
    today: MeetingType[];
    tomorrow: MeetingType[];
};

export const separateNearest = (meetings: MeetingType[]): SeparatedMeetings => {
    const separated: SeparatedMeetings = {
        today: [],
        tomorrow: [],
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    for (const meeting of meetings) {
        const meetingDate = new Date(meeting.date);
        meetingDate.setHours(0, 0, 0, 0);

        // Сравниваем даты (без времени)
        if (meetingDate.getTime() === today.getTime()) {
            separated.today.push(meeting);
        } else if (meetingDate.getTime() === tomorrow.getTime()) {
            separated.tomorrow.push(meeting);
        }
    }

    return separated;
};
