import { useState } from "react";
import Field from "../../../common/Field/Field";
import DatePicker from "../../../common/DatePicker/DatePicker";
import type { FormErrorType } from "../../../../../types/FormErrorType";
import { validateForm } from "../utils/validateForm";
import { useAppDispatch } from "../../../../hooks/redux";
import { addSpending } from "../../../../../store/slice/meetings.slice";
import type { SpendingType } from "../../../../../types/SpendingType";

type SpendingFormProps = {
    setOpen: (state: boolean) => void;
};

function SpendingForm({ setOpen }: SpendingFormProps) {
    const dispatch = useAppDispatch();
    const [spending, setSpending] = useState<string>("");
    const [amount, setAmount] = useState("0");
    const [date, setDate] = useState("");
    const [error, setError] = useState<null | FormErrorType>(null);

    return (
        <>
            {error && <span className="error-text">❌ {error.message}</span>}
            <Field
                label="Наименование"
                placeholder="Наименование траты"
                value={spending}
                setValue={setSpending}
                error={
                    error?.field === "spending" && spending.length === 0
                        ? error?.message
                        : undefined
                }
            />
            <DatePicker
                label="Дата траты"
                time={false}
                setDate={setDate}
                date={date}
                error={
                    error?.field === "date" && date.length === 0
                        ? error?.message
                        : undefined
                }
            />
            <Field
                label="Сумма, ₽"
                placeholder="Сумма траты"
                type="number"
                value={amount}
                setValue={setAmount}
                error={
                    error?.field === "amount" && Number(amount) <= 0
                        ? error?.message
                        : undefined
                }
            />
            <button
                style={{ width: "80px", alignSelf: "flex-end" }}
                onClick={() => {
                    const spendingObj: SpendingType = {
                        id: Date.now(),
                        spending,
                        amount: Number(amount),
                        date,
                    };

                    try {
                        validateForm(spendingObj);
                        dispatch(addSpending(spendingObj));
                        setOpen(false);
                    } catch (e) {
                        setError(JSON.parse((e as Error).message));
                    }
                }}
            >
                Создать
            </button>
        </>
    );
}

export default SpendingForm;
