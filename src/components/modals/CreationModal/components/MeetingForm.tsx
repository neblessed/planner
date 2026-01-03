import DatePicker from "../../../common/DatePicker/DatePicker";
import Field from "../../../common/Field/Field";
import Textarea from "../../../common/Textarea/Textarea";

function MeetingForm() {
    return (
        <>
            <Field label="Имя заказчика" placeholder="Введите имя" />
            <Field label="Telegram" placeholder="Ссылка на телеграм" />
            <Field label="Место" placeholder="Место проведения съемки" />
            {/* <Field label="Дата и время" placeholder="Время съемки" /> */}
            <DatePicker label="Дата и время" placeholder="Время съемки" />
            <Textarea label="Комментарий" placeholder="Комментарий к записи" />
            <button style={{ width: "80px", alignSelf: "flex-end" }}>
                Создать
            </button>
        </>
    );
}

export default MeetingForm;
