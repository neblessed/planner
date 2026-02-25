import { MeetingType } from '../../types/MeetingType';
import { MergedMeeting } from '../../types/MergerdMeeting';
import './ClientAtom.css';
import ShortMeetingItem from './components/ShortMeetingItem';

type ClientAtomProps = {
	clientMeetings: MergedMeeting[];
};

function ClientAtom({ clientMeetings }: ClientAtomProps) {
	const [staticData] = clientMeetings;
	const totalEarnings = clientMeetings
		.map((meeting) => meeting.amount ?? 0)
		.reduce((a, b) => a + b, 0);

	return (
		<div className="client">
			<img className="client_avatar" src="./icons/person.svg" />
			<div className="client_info">
				<span className="client_name">{staticData?.person}</span>
				<div className="client_stats">
					<a
						className="client_tg client_stat"
						href={staticData?.telegram}
					>
						<img src="./icons/telegram.svg" />
					</a>
					<span className="client_stat">
						♥️ {clientMeetings.length}
					</span>
					<span className="client_stat">Без отзыва</span>
					<span className="client_stat">💸 {totalEarnings} ₽</span>
				</div>
			</div>
			<div className="client_recent_meetings">
				{clientMeetings.map((meeting) => (
					<ShortMeetingItem
						key={meeting.id}
						date={meeting.date}
						amount={meeting.amount}
						status={meeting.status}
						wfolio={meeting.wfolio}
					/>
				))}
			</div>
		</div>
	);
}

export default ClientAtom;
