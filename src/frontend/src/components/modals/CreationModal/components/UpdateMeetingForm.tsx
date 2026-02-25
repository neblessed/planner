import { RefObject, useState } from 'react';
import type { MeetingType } from '../../../../types/MeetingType';
import type { FormErrorType } from '../../../../types/FormErrorType';
import Field from '../../../common/Field/Field';
import DatePicker from '../../../common/DatePicker/DatePicker';
import Textarea from '../../../common/Textarea/Textarea';
import { validateForm } from '../utils/validateForm';
import { useAppDispatch } from '../../../../hooks/redux';
import {
	deleteExistedMeeting,
	updateExistedMeeting,
} from '../../../../store/thunks/meeting.thunk';
import { MergedMeeting } from '../../../../types/MergerdMeeting';
import FormPlate from '../../../common/Plate/FormPlate';

type UpdateMeetingFormProps = {
	meeting: MergedMeeting;
	setOpen: (state: boolean) => void;
	updatingRowRef: RefObject<any>;
};

function UpdateMeetingForm({
	meeting,
	setOpen,
	updatingRowRef,
}: UpdateMeetingFormProps) {
	const dispatch = useAppDispatch();

	const [person, setPerson] = useState(meeting.person);
	const [telegram, setTelegram] = useState(
		meeting.telegram.replace('https://t.me/', ''),
	);
	const [wfolio, setWfolio] = useState(meeting.wfolio ?? null);
	const [date, setDate] = useState(meeting.date);
	const [amount, setAmount] = useState(
		meeting.amount ? meeting.amount.toString() : null,
	);
	const [location, setLocation] = useState(meeting.location);
	const [comment, setComment] = useState(meeting.comment ?? null);
	const [error, setError] = useState<null | FormErrorType>(null);

	return (
		<>
			{error && <span className="error-text">❌ {error.message}</span>}
			<FormPlate title="Данные о клиенте">
				<Field
					label="Имя клиента"
					placeholder="Введите имя"
					value={person}
					setValue={setPerson}
					error={
						error?.field === 'person' && person.length === 0
							? error?.message
							: undefined
					}
				/>
				<Field
					label="Telegram"
					placeholder="Введите @username"
					value={telegram}
					setValue={setTelegram}
					error={
						error?.field === 'telegram' && telegram.length === 0
							? error?.message
							: undefined
					}
				/>
			</FormPlate>
			<FormPlate title="Информация о съемке">
				{wfolio && (
					<Field
						label="Wfolio"
						placeholder="Введите ссылку на wfolio"
						value={wfolio}
						setValue={setWfolio}
						error={
							error?.field === 'wfolio' && wfolio.length === 0
								? error?.message
								: undefined
						}
					/>
				)}
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
				{amount || meeting.amount ? (
					<Field
						label="Стоимость съемки"
						placeholder="Введите стоимость съемки"
						value={amount!}
						setValue={setAmount}
						error={
							error?.field === 'amount' && Number(amount) <= 0
								? error?.message
								: undefined
						}
					/>
				) : null}
				{comment || meeting.comment ? (
					<Textarea
						label="Комментарий"
						placeholder="Комментарий к клиенту"
						value={comment!}
						setValue={setComment}
					/>
				) : null}
			</FormPlate>
			<div
				className="update_meeting_form__buttons"
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					gap: '5px',
				}}
			>
				<button
					style={{
						width: '80px',
						background: '#ef3726a4',
						opacity: '0.25',
					}}
					onClick={() => {
						updatingRowRef.current.classList.add('deleting');
						setOpen(false);
						setTimeout(() => {
							dispatch(deleteExistedMeeting(meeting.id));
						}, 200);
					}}
				>
					Удалить
				</button>
				<button
					style={{ width: '100px' }}
					onClick={() => {
						const updated: MeetingType = {
							id: meeting.id,
							person,
							telegram,
							...(wfolio && { wfolio }),
							status: meeting.status,
							date,
							...(amount && { amount: Number(amount) }),
							location,
							...(comment !== null && { comment }),
						};

						try {
							validateForm(updated);
							dispatch(updateExistedMeeting(updated));
							setOpen(false);
						} catch (e) {
							setError(
								JSON.parse(
									(e as Error).message,
								) as FormErrorType,
							);
						}
					}}
				>
					Сохранить
				</button>
			</div>
		</>
	);
}

export default UpdateMeetingForm;
