import { useState } from "react";
import DatePicker from "../../../common/DatePicker/DatePicker";
import Field from "../../../common/Field/Field";
import Textarea from "../../../common/Textarea/Textarea";
import { useAppDispatch } from "../../../../hooks/redux";
import { addMeeting } from "../../../../store/slice/meetings.slice";
import { validateForm } from "../utils/validateForm";
import type { MeetingType } from "../../../../types/MeetingType";
import type { FormErrorType } from "../../../../types/FormErrorType";

type MeetingFormProps = {
    setOpen: (state: boolean) => void;
};

function MeetingForm({ setOpen }: MeetingFormProps) {
    const dispatch = useAppDispatch();
    const [person, setPerson] = useState("");
    const [telegram, setTelegram] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState<string>("");
    const [comment, setComment] = useState("");
    const [error, setError] = useState<null | FormErrorType>(null);

    return (
        <>
            {error && <span className="error-text">❌ {error.message}</span>}
            <Field
                label="Имя клиента"
                placeholder="Введите имя"
                value={person}
                setValue={setPerson}
                error={
                    error?.field === "person" && person.length === 0
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
                    error?.field === "telegram" && telegram.length === 0
                        ? error?.message
                        : undefined
                }
            />
            <Field
                label="Место"
                placeholder="Место проведения съемки"
                value={location}
                setValue={setLocation}
                error={
                    error?.field === "location" && location.length === 0
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
                    error?.field === "date" && date.length === 0
                        ? error?.message
                        : undefined
                }
            />
            <Textarea
                label="Комментарий"
                placeholder="Комментарий к клиенту"
                value={comment}
                setValue={setComment}
            />
            <button
                style={{ width: "80px", alignSelf: "flex-end" }}
                onClick={() => {
                    const meeting: MeetingType = {
                        id: Date.now(),
                        person,
                        location,
                        date,
                        links: {
                            telegram: `https://t.me/${telegram.replace(
                                "@",
                                ""
                            )}`,
                        },
                        comment,
                        status: "Назначено",
                    };

                    try {
                        validateForm(meeting);
                        dispatch(addMeeting(meeting));
                        setOpen(false);
                    } catch (e) {
                        setError(
                            JSON.parse((e as Error).message) as FormErrorType
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
