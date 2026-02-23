import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import Field from '../../../common/Field/Field';
import FormPlate from '../../../common/Plate/FormPlate';
import { FormErrorType } from '../../../../types/FormErrorType';
import Dropdown from '../../../common/Dropdown/Dropdown';
import { useAppSelector } from '../../../../hooks/redux';

interface ClientPlateProps {
	error?: FormErrorType | null;
	setClient: Dispatch<SetStateAction<{ name: string; telegram: string }>>;
}

const ClientPlate: React.FC<ClientPlateProps> = ({ error, setClient }) => {
	const { clients } = useAppSelector((store) => store.meetingsReducer);

	const [person, setPerson] = useState('');
	const [telegram, setTelegram] = useState('');
	const [personArrayIndex, setPersonArrayIndex] = useState<null | number>(
		null,
	);

	const formatedClients = useMemo(
		() => clients.map((c) => c.telegram.split('/').at(-1)),
		[clients],
	);

	useEffect(() => {
		if (personArrayIndex !== null) {
			setPerson(clients[personArrayIndex].name);
		} else {
			setPerson('');
		}
	}, [personArrayIndex]);

	useEffect(() => {
		setClient({ name: person, telegram });
	}, [telegram, person]);

	console.log(error);

	return (
		<FormPlate
			title="Данные о клиенте"
			hintText="Блок для поиска или создания клиента"
		>
			<Dropdown
				label="Telegram:"
				id="username"
				options={formatedClients}
				placeholder="Введите @username"
				selected={telegram}
				setSelected={setTelegram}
				setIndex={setPersonArrayIndex}
				optionIconPath="./icons/telegram.svg"
				fieldDataHint="+👤"
				error={
					error?.field === 'telegram' && telegram.length === 0
						? error?.message
						: undefined
				}
			/>
			<Field
				label="Имя клиента"
				placeholder="Введите имя"
				value={
					personArrayIndex !== null
						? clients[personArrayIndex].name
						: person
				}
				setValue={setPerson}
				error={
					error?.field === 'person' && person.length === 0
						? error?.message
						: undefined
				}
				disabled={
					personArrayIndex !== null &&
					clients[personArrayIndex].name !== undefined
				}
			/>
		</FormPlate>
	);
};

export default ClientPlate;
