import type { MeetingType } from "../../../types/MeetingType";

type SeparatedMeetings = {
    one: MeetingType[];
    two: MeetingType[];
    three: MeetingType[];
    four: MeetingType[];
    five: MeetingType[];
    six: MeetingType[];
    seven: MeetingType[];
};

export const separateNearest = (meetings: MeetingType[]): SeparatedMeetings => {
    const separated: SeparatedMeetings = {
        one: [],
        two: [],
        three: [],
        four: [],
        five: [],
        six: [],
        seven: [],
    };

    const days = Array.from({ length: 7 }).map((_, index) => {
        const day = new Date();
        day.setDate(day.getDate() + index);
        day.setHours(0, 0, 0, 0);

        return day;
    });

    for (const meeting of meetings) {
        const meetingDate = new Date(meeting.date);
        meetingDate.setHours(0, 0, 0, 0);

        if (meetingDate.getTime() === days[0].getTime()) {
            separated.one.push(meeting);
        }

        if (meetingDate.getTime() === days[1].getTime()) {
            separated.two.push(meeting);
        }

        if (meetingDate.getTime() === days[2].getTime()) {
            separated.three.push(meeting);
        }

        if (meetingDate.getTime() === days[3].getTime()) {
            separated.four.push(meeting);
        }

        if (meetingDate.getTime() === days[4].getTime()) {
            separated.five.push(meeting);
        }

        if (meetingDate.getTime() === days[5].getTime()) {
            separated.six.push(meeting);
        }

        if (meetingDate.getTime() === days[6].getTime()) {
            separated.seven.push(meeting);
        }
    }

    return separated;
};
