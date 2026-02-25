import { MergedMeeting } from '../../../types/MergerdMeeting';

/**
 * Группирует встречи по пользователям
 */
export const groupMeetingsByClient = (
	meetings: MergedMeeting[],
): MergedMeeting[][] => {
	const meetingsByUser = new Map<string, MergedMeeting[]>();

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
