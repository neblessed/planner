import { useState } from "react";
import DatePicker from "../../../common/DatePicker/DatePicker";
import Field from "../../../common/Field/Field";
import Textarea from "../../../common/Textarea/Textarea";

function MeetingForm() {
    const [date, setDate] = useState<string>("");

    return (
        <>
            <Field label="Имя клиента" placeholder="Введите имя" />
            <Field label="Telegram" placeholder="Ссылка на телеграм" />
            <Field label="Место" placeholder="Место проведения съемки" />
            <DatePicker
                label="Дата и время"
                placeholder="Время съемки"
                date={date}
                setDate={setDate}
            />
            <Textarea label="Комментарий" placeholder="Комментарий к клиенту" />
            <button style={{ width: "80px", alignSelf: "flex-end" }}>
                Создать
            </button>
        </>
    );
}

export default MeetingForm;
