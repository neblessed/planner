import { Dispatch, SetStateAction, useRef, useState } from "react";
import "./Dropdown.css";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

interface DropdownProps {
    id: string;
    label: string;
    options: any[];
    placeholder?: string;
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
}

const Dropdown: React.FC<DropdownProps> = ({
    id,
    label,
    placeholder,
    options,
    selected,
    setSelected,
}) => {
    const [open, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const handleChoice = (option: string) => {
        setSelected(option);
        setIsOpen(false);
    };

    useOnClickOutside(dropdownRef, () => {
        setIsOpen(false);
    });

    return (
        <div className="dropdown">
            <label className="dropdown_field_label" htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                placeholder={placeholder}
                autoComplete="off"
                value={selected}
                onClick={() => setIsOpen(true)}
                onChange={(e) => {
                    setSelected(e.target.value);
                    setIsOpen(true);
                }}
            />
            {open && (
                <div ref={dropdownRef}>
                    <ul className="dropdown_options">
                        {options
                            .filter((option) =>
                                option
                                    .toLowerCase()
                                    .includes(selected.toLowerCase()),
                            )
                            .map((option, index) => (
                                <li
                                    key={index}
                                    className="dropdown_option"
                                    onClick={() => handleChoice(option)}
                                >
                                    {option}
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
