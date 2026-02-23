import { useState } from 'react';
import Field from '../../../common/Field/Field';
import FormPlate from '../../../common/Plate/FormPlate';
import { FormErrorType } from '../../../../types/FormErrorType';
import Dropdown from '../../../common/Dropdown/Dropdown';

interface ClientPlateProps {
	error?: FormErrorType | null;
}

const ClientPlate: React.FC<ClientPlateProps> = ({ error }) => {
	const [person, setPerson] = useState({ positionInArray: '', person: '' });
	const [telegram, setTelegram] = useState('');

	return (
		<FormPlate
			title="Данные о клиенте"
			hintText="Блок поиска/создания клиентов"
		>
			<Dropdown
				label="Имя клиента:"
				id="username"
				options={[
					'Катя',
					'Маша',
					'Таня',
					'Катя',
					'Маша',
					'Таня',
					'Катя',
					'Маша',
					'Таня',
					'Катя',
					'Маша',
					'Таня',
				]}
				placeholder="Введите имя"
				selected={person}
				setSelected={setPerson}
			/>
			{/* <Field
                label="Имя клиента"
                placeholder="Введите имя"
                value={person}
                setValue={setPerson}
                error={
                    error?.field === "person" && person.length === 0
                        ? error?.message
                        : undefined
                }
            /> */}
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
	);
};

export default ClientPlate;
