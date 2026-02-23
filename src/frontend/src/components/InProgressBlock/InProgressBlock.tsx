import { useAppSelector } from '../../hooks/redux';
import Block from '../common/Block/Block';
import MeetingItem from '../MeetingItem/MeetingItem';
import { getDeadlineDays } from '../MeetingItem/utils/getDeadlineDays';

function InProgressBlock() {
	const { meetings } = useAppSelector((store) => store.meetingsReducer);
	const inProgressMeetings = meetings
		.filter(
			(meeting) =>
				meeting.status === 'Ждёт обработки' ||
				meeting.status === 'В обработке',
		)
		.sort(
			(a, b) =>
				getDeadlineDays(a.deadlineDate!) -
				getDeadlineDays(b.deadlineDate!),
		);
	return (
		<>
			<Block title="В работе 💻" wide={true}>
				{inProgressMeetings.length > 0 ? (
					inProgressMeetings.map((meeting) => {
						return (
							<MeetingItem key={meeting.id} meeting={meeting} />
						);
					})
				) : (
					<span className="empty_list_text">
						Нет съемок в обработке
					</span>
				)}
			</Block>
		</>
	);
}

export default InProgressBlock;
