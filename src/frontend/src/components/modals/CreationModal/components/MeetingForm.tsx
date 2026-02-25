import { useEffect, useState } from 'react';
import DatePicker from '../../../common/DatePicker/DatePicker';
import Field from '../../../common/Field/Field';
import Textarea from '../../../common/Textarea/Textarea';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { validateForm } from '../utils/validateForm';
import type { MeetingType } from '../../../../types/MeetingType';
import type { FormErrorType } from '../../../../types/FormErrorType';
import {
	createNewMeeting,
	fetchMeetings,
} from '../../../../store/thunks/meeting.thunk';
import FormPlate from '../../../common/Plate/FormPlate';
import ClientPlate from './ClientPlate';
import { ClientType } from '../../../../types/ClientType';
import {
	createNewClient,
	fetchClients,
} from '../../../../store/thunks/client.thunk';

type MeetingFormProps = {
	setOpen: (state: boolean) => void;
};

function MeetingForm({ setOpen }: MeetingFormProps) {
	const dispatch = useAppDispatch();
	const { clients } = useAppSelector((store) => store.meetingsReducer);
	const [client, setClient] = useState<{
		id: null | number;
		name: string;
		telegram: string;
	}>({ id: null, name: '', telegram: '' });
	const [location, setLocation] = useState('');
	const [date, setDate] = useState<string>('');
	const [comment, setComment] = useState('');
	const [error, setError] = useState<null | FormErrorType>(null);

	return (
		<>
			{error && <span className="error-text">❌ {error.message}</span>}
			<ClientPlate
				clients={clients}
				setClient={setClient}
				error={error}
			/>
			<FormPlate title="Информация о съемке">
				<Field
					label="Место"
					placeholder="Место проведения съемки"
					value={location}
					setValue={setLocation}
					error={
						error?.field === 'location' && location.length === 0
							? error?.message
							: undefined
					}
				/>
				<DatePicker
					label="Дата и время"
					placeholder="Время съемки"
					date={date}
					setDate={setDate}
					error={
						error?.field === 'date' && date.length === 0
							? error?.message
							: undefined
					}
				/>
				<Textarea
					label="Комментарий"
					placeholder="Комментарий к встрече"
					value={comment}
					setValue={setComment}
				/>
			</FormPlate>
			<button
				style={{ width: '80px', alignSelf: 'flex-end' }}
				onClick={() => {
					const telegramLink = `https://t.me/${client.telegram.trim().replace('@', '')}`;
					const clientToCreate: Omit<ClientType, 'id'> = {
						name: client.name,
						telegram: telegramLink,
						feedback: false,
						note: '',
					};

					const meeting: Omit<MeetingType, 'personId'> = {
						id: Date.now(),
						location: location.trim(),
						date: date.trim(),
						comment: comment.trim(),
						status: 'Назначено',
					};

					try {
						validateForm({
							id: Date.now(),
							person: client.name.trim(),
							location: location.trim(),
							date: date.trim(),
							comment: comment.trim(),
							status: 'Назначено',
							telegram: telegramLink,
						});

						if (clients.some((c) => c.telegram === telegramLink)) {
							dispatch(
								createNewMeeting({
									...meeting,
									personId: client.id!,
								}),
							).then(() => {
								dispatch(fetchMeetings()).unwrap();
								setOpen(false);
							});
						} else {
							dispatch(createNewClient(clientToCreate)).then(
								(res) => {
									const { client } = res.payload;
									const { id } = client;

									dispatch(
										createNewMeeting({
											...meeting,
											personId: id,
										}),
									).then(() => {
										dispatch(fetchMeetings()).unwrap();
										dispatch(fetchClients()).unwrap();
										setOpen(false);
									});
								},
							);
						}
					} catch (e) {
						setError(
							JSON.parse((e as Error).message) as FormErrorType,
						);
					}
				}}
			>
				Создать
			</button>
		</>
	);
}

export default MeetingForm;
