import Field from "../../../common/Field/Field";

function SpendingForm() {
    return (
        <>
            <Field label="Наименование" placeholder="Наименование траты" />
            <Field label="Сумма" placeholder="Сумма траты" type="number" />
            <button style={{ width: "80px", alignSelf: "flex-end" }}>
                Создать
            </button>
        </>
    );
}

export default SpendingForm;
