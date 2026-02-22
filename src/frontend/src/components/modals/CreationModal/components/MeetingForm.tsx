import { useState } from "react";
import DatePicker from "../../../common/DatePicker/DatePicker";
import Field from "../../../common/Field/Field";
import Textarea from "../../../common/Textarea/Textarea";
import { useAppDispatch } from "../../../../hooks/redux";
import { validateForm } from "../utils/validateForm";
import type { MeetingType } from "../../../../types/MeetingType";
import type { FormErrorType } from "../../../../types/FormErrorType";
import { createNewMeeting } from "../../../../store/thunks/meeting.thunk";
import FormPlate from "../../../common/Plate/FormPlate";
import ClientPlate from "./ClientPlate";

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
            <ClientPlate error={error} />
            <FormPlate title="Информация о съемке">
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
            </FormPlate>
            <button
                style={{ width: "80px", alignSelf: "flex-end" }}
                onClick={() => {
                    const meeting: MeetingType = {
                        id: Date.now(),
                        person: person.trim(),
                        location: location.trim(),
                        date: date.trim(),
                        telegram: `https://t.me/${telegram.trim().replace("@", "")}`,
                        comment: comment.trim(),
                        status: "Назначено",
                    };

                    try {
                        validateForm(meeting);
                        dispatch(createNewMeeting(meeting));
                        setOpen(false);
                    } catch (e) {
                        setError(
                            JSON.parse((e as Error).message) as FormErrorType,
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
