import { useState } from "react";
import "./DatePicker.css";

type DatePickerProps = {
    label?: string;
    placeholder?: string;
};

function DatePicker({ label, placeholder = "Выберите дату" }: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);

    // https://www.figma.com/design/ADgjXzRT93xanaURUXYdTb/iOS-Inline-Date---Time-Picker--Community-?node-id=0-1&p=f&t=TSy9pG1ba7U4V6U6-0

    return (
        <div className="datepicker">
            <div
                className="datepicker__root"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {label && (
                    <span className="datepicker__root_label">{label}:</span>
                )}
                <div className="datepicker__root_field">
                    <img
                        className="datepicker__root_icon"
                        src="./icons/calendar.svg"
                    />
                    <span className="datepicker__root_field_placeholder">
                        {placeholder}
                    </span>
                </div>
            </div>
            {isOpen && (
                <div className="calendar">
                    <div className="calendar__header"></div>
                    <div className="calendar__days">
                        {Array.from({ length: 31 }).map((_, day) => {
                            const current = day + 1;

                            return (
                                <span className="calendar__day" key={current}>
                                    {current}
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DatePicker;
