import { useState } from "react";
import DatePicker from "../../../common/DatePicker/DatePicker";
import Field from "../../../common/Field/Field";
import Textarea from "../../../common/Textarea/Textarea";
import { useAppDispatch } from "../../../../hooks/redux";
import { addMeeting } from "../../../../store/slice/meetings.slice";

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

    return (
        <>
            <Field
                label="Имя клиента"
                placeholder="Введите имя"
                value={person}
                setValue={setPerson}
            />
            <Field
                label="Telegram"
                placeholder="Введите @username"
                value={telegram}
                setValue={setTelegram}
            />
            <Field
                label="Место"
                placeholder="Место проведения съемки"
                value={location}
                setValue={setLocation}
            />
            <DatePicker
                label="Дата и время"
                placeholder="Время съемки"
                date={date}
                setDate={setDate}
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
                    dispatch(
                        addMeeting({
                            id: Date.now(),
                            person,
                            location,
                            date: new Date(date),
                            links: {
                                telegram: `https://t.me/${telegram.replace(
                                    "@",
                                    ""
                                )}`,
                            },
                            comment,
                            status: "Назначено",
                        })
                    );
                    setOpen(false);
                }}
            >
                Создать
            </button>
        </>
    );
}

export default MeetingForm;
