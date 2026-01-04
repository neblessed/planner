import { useState } from "react";
import "./DatePicker.css";

type DatePickerProps = {
    label?: string;
    placeholder?: string;
    date: string;
    setDate: (date: string) => void;
};

const formatISODateToFieldValue = (isoDate: string) => {
    const date = new Date(isoDate);
    const now = new Date();

    return date.toLocaleString("ru-RU", {
        day: "numeric",
        month: "long",
        ...(date.getFullYear() !== now.getFullYear()
            ? { year: "numeric" }
            : {}),
        hour: "2-digit",
        minute: "2-digit",
    });
};

function DatePicker({
    label,
    placeholder = "Выберите дату",
    date,
    setDate,
}: DatePickerProps) {
    const now = new Date();
    const [calendarDate, setCalendarDate] = useState(now);
    const [isOpen, setIsOpen] = useState(false);

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
                    {date ? (
                        <span className="datepicker__root_field_value">
                            {formatISODateToFieldValue(date)}
                        </span>
                    ) : (
                        <>
                            <img
                                className="datepicker__root_icon"
                                src="./icons/calendar.svg"
                            />
                            <span className="datepicker__root_field_placeholder">
                                {placeholder}
                            </span>
                        </>
                    )}
                </div>
            </div>
            {isOpen && (
                <div className="calendar">
                    <div className="calendar__header">
                        <span className="calendar__header_period">
                            {calendarDate.toLocaleDateString("ru-RU", {
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                        <div className="calendar__header_controls">
                            <img
                                alt="<"
                                src="./icons/arrow-right-2.svg"
                                onClick={() =>
                                    setCalendarDate((prev) => {
                                        const newDate = new Date(prev);
                                        newDate.setMonth(prev.getMonth() - 1);
                                        return newDate;
                                    })
                                }
                            />
                            <img
                                alt=">"
                                src="./icons/arrow-left-2.svg"
                                onClick={() =>
                                    setCalendarDate((prev) => {
                                        const newDate = new Date(prev);
                                        newDate.setMonth(prev.getMonth() + 1);
                                        return newDate;
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="calendar__days">
                        {Array.from({ length: 31 }).map((_, day) => {
                            const current = day + 1;

                            return (
                                <span
                                    key={current}
                                    className={`calendar__day ${
                                        calendarDate.getDate() === current
                                            ? "day_selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setCalendarDate((prev) => {
                                            const newDate = new Date(prev);
                                            newDate.setDate(current);
                                            return newDate;
                                        })
                                    }
                                >
                                    {current}
                                </span>
                            );
                        })}
                    </div>
                    <div className="calendar__footer">
                        <div className="calendar__time">
                            <span className="calendar__time_label">Время:</span>
                            <input
                                type="time"
                                onChange={(e) => {
                                    const [hours, minutes] = e.target.value
                                        .split(":")
                                        .map(Number);
                                    setCalendarDate((prev) => {
                                        const newDate = new Date(prev);
                                        newDate.setHours(hours, minutes, 0, 0);
                                        return newDate;
                                    });
                                }}
                            />
                        </div>
                        <button
                            onClick={() => {
                                setDate(calendarDate.toISOString());
                                setIsOpen(false);
                            }}
                        >
                            ОК
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DatePicker;
