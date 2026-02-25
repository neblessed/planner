import { useAppSelector } from '../hooks/redux';
import { MergedMeeting } from '../types/MergerdMeeting';

export const getMergedMeetingsWithClients = (): MergedMeeting[] => {
	const { meetings, clients, loading } = useAppSelector(
		(store) => store.meetingsReducer,
	);

	return meetings.map((meeting) => {
		const client = clients.find((client) => client.id === meeting.personId);

		return {
			...meeting,
			person: client?.name!,
			telegram: client?.telegram!,
		};
	});
};
