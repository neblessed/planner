import { Dispatch, SetStateAction, useRef, useState } from 'react';
import './Dropdown.css';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';

interface DropdownProps {
	id: string;
	label: string;
	options: any[];
	placeholder?: string;
	selected: string;
	setSelected: Dispatch<SetStateAction<string>>;
	/**
	 * Устанавливает индекс выбранного элемента из массива
	 */
	setIndex?: Dispatch<SetStateAction<number | null>>;
	optionIconPath?: string;
	optionIconSizePx?: string;
	fieldDataHint?: string;
	error?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
	id,
	label,
	placeholder,
	options,
	selected,
	setSelected,
	setIndex,
	optionIconPath,
	optionIconSizePx,
	fieldDataHint,
	error,
}) => {
	const [open, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const transformedOptions = options.map((option, index) => {
		return { id: index, option };
	});

	const handleChoice = (option: string, index: number) => {
		setSelected(option);
		setIsOpen(false);

		if (setIndex) {
			setIndex(index);
		}
	};

	useOnClickOutside(dropdownRef, () => {
		setIsOpen(false);
	});

	return (
		<div className="dropdown">
			<label className="dropdown_field_label" htmlFor={id}>
				{label}
			</label>
			<div
				className={`dropdown_field_wrapper ${!options.includes(selected) && selected.length > 0 ? 'show-hint' : ''}`}
				data-hint={fieldDataHint || ''}
			>
				<input
					className={`dropdown_field ${error ? 'input-error' : ''}`}
					id={id}
					placeholder={placeholder}
					autoComplete="off"
					value={selected}
					onChange={(e) => {
						const value = e.target.value;

						setSelected(value);
						setIsOpen(true);

						if (!options.includes(value) && setIndex) {
							setIndex(null);
						}
					}}
				/>
			</div>
			{open && (
				<div ref={dropdownRef}>
					<ul className="dropdown_options">
						{transformedOptions
							.filter((option) =>
								option.option
									.toLowerCase()
									.includes(selected.toLowerCase()),
							)
							.map((option, index) => (
								<li
									key={index}
									className="dropdown_option"
									onClick={() =>
										handleChoice(option.option, option.id)
									}
								>
									{optionIconPath && (
										<img
											className="option_li_icon"
											style={{
												width: 'auto',
												height: optionIconSizePx,
											}}
											src={optionIconPath}
										/>
									)}
									{option.option}
								</li>
							))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Dropdown;
