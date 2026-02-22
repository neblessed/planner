import { Dispatch, SetStateAction, useState } from "react";
import "./Dropdown.css";

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
    const [query, setQuery] = useState("");

    const handleChoice = (option: string) => {
        setQuery("");
        setSelected(option);
    };

    return (
        <div className="dropdown">
            <label className="dropdown_field_label" htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                placeholder={placeholder}
                value={selected}
                onChange={(e) => setQuery(e.target.value)}
            />
            {query.length > 0 && (
                <div>
                    <ul className="dropdown_options">
                        {options
                            .filter((option) =>
                                option
                                    .toLowerCase()
                                    .includes(query.toLowerCase()),
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
