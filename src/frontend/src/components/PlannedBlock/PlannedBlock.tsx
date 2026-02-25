import Block from '../common/Block/Block';
import MeetingItem from '../MeetingItem/MeetingItem';
import { getMergedMeetingsWithClients } from '../../utils/getMergedMeetingsWithClients';
import { MergedMeeting } from '../../types/MergerdMeeting';

function PlannedBlock() {
	const meetings = getMergedMeetingsWithClients();

	const plannedMeetings = meetings
		.filter(
			(meeting: MergedMeeting) =>
				meeting.status === 'Назначено' ||
				meeting.status === 'Проведено',
		)
		.sort(
			(m1, m2) =>
				new Date(m1.date).getTime() - new Date(m2.date).getTime(),
		);

	return (
		<>
			<Block title="Запланировано 📅" wide={true}>
				{plannedMeetings.length > 0 ? (
					plannedMeetings.map((meeting: MergedMeeting) => {
						return (
							<MeetingItem key={meeting.id} meeting={meeting} />
						);
					})
				) : (
					<span className="empty_list_text">
						Нет запланированных записей
					</span>
				)}
			</Block>
		</>
	);
}

export default PlannedBlock;
