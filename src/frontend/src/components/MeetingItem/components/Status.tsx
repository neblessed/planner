import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { updateMeeting } from "../../../store/slice/meetings.slice";
import type { StatusType } from "../../../types/StatusType";
import Popover from "../../common/Popover/Popover";
import "./Status.css";
import Modal from "../../common/Modal/Modal";
import Field from "../../common/Field/Field";
import type { FormErrorType } from "../../../types/FormErrorType";
import { validateStatusForm } from "../utils/validateStatusForm";
import { updateExistedMeeting } from "../../../store/thunks/meeting.thunk";
import { MeetingType } from "../../../types/MeetingType";

type StatusProps = {
    id: number;
    status: StatusType;
    isOpen: boolean;
    setIsOpened: (state: any) => void;
};

const statusStyleMapping: Record<StatusType, string> = {
    Назначено: "assigned",
    Проведено: "completed",
    "Ждёт обработки": "pending",
    "В обработке": "processing",
    Сдано: "submitted",
};

function Status({ id, status, isOpen, setIsOpened }: StatusProps) {
    const dispatch = useAppDispatch();
    const { meetings } = useAppSelector((store) => store.meetingsReducer);
    const [updatedStatus, setUpdatedStatus] = useState<StatusType>(status);
    const [amount, setAmount] = useState<string | null>(null);
    const [wfolio, setWfolio] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deadlineDate, setDeadlineDate] = useState<string | null>(null);
    const [error, setError] = useState<null | FormErrorType>(null);

    return (
        <div
            className={`meeting_status ${statusStyleMapping[status]}`}
            onClick={() => setIsOpened((prev) => !prev)}
        >
            {status}
            <Popover isOpen={isOpen} onClose={() => setIsOpened(false)}>
                <div className="popover_statuses">
                    {Object.keys(statusStyleMapping).map((s) => {
                        const type = s as StatusType;

                        return (
                            <span
                                key={s}
                                className={`meeting_status ${statusStyleMapping[type]}`}
                                onClick={() => {
                                    if (type !== status) {
                                        setIsOpened(true);
                                        setUpdatedStatus(type);

                                        if (type === "Проведено") {
                                            const deadline = new Date();
                                            deadline.setHours(0, 0, 0, 0);

                                            // Дедлайн 10 дней
                                            deadline.setDate(
                                                deadline.getDate() + 10,
                                            );

                                            setAmount("0");
                                            setWfolio(null);
                                            setDeadlineDate(
                                                deadline.toISOString(),
                                            );
                                            setIsModalOpen(true);
                                        }

                                        if (type === "Сдано") {
                                            setWfolio("");
                                            setAmount(null);
                                            setIsModalOpen(true);
                                        } else {
                                            dispatch(
                                                updateExistedMeeting({
                                                    id,
                                                    status: type,
                                                }),
                                            );
                                        }
                                    }
                                }}
                            >
                                {s}
                            </span>
                        );
                    })}
                </div>
            </Popover>
            {isModalOpen && (
                <Modal title="Обновление встречи" setOpen={setIsModalOpen}>
                    <div className="update_status_form">
                        {error && (
                            <span className="error-text">
                                ❌ {error.message}
                            </span>
                        )}
                        {amount !== null && (
                            <Field
                                label="Сумма съемки"
                                value={amount === "0" ? "" : amount}
                                setValue={setAmount}
                                placeholder="Введите сумму"
                                error={
                                    error?.field === "status-amount" &&
                                    Number(amount) <= 0
                                        ? error?.message
                                        : undefined
                                }
                            />
                        )}
                        {wfolio !== null && (
                            <Field
                                label="Ссылка на портфолио"
                                value={wfolio}
                                setValue={setWfolio}
                                placeholder="Введите ссылку на wfolio"
                                error={
                                    error?.field === "status-wfolio" &&
                                    wfolio.length === 0
                                        ? error?.message
                                        : undefined
                                }
                            />
                        )}
                        <button
                            style={{ width: "90px", alignSelf: "flex-end" }}
                            onClick={() => {
                                try {
                                    validateStatusForm({ amount, wfolio });

                                    const meeting = meetings.find(
                                        (m: MeetingType) => m.id === id,
                                    );

                                    if (meeting) {
                                        dispatch(
                                            updateExistedMeeting({
                                                ...meeting,
                                                ...(wfolio && { wfolio }),
                                                ...(amount && {
                                                    amount: Number(amount),
                                                }),
                                                status: updatedStatus,
                                                ...(deadlineDate && {
                                                    deadlineDate,
                                                }),
                                            }),
                                        );

                                        setError(null);
                                    }

                                    setIsModalOpen(false);
                                    setIsOpened(true);
                                } catch (e) {
                                    setError(
                                        JSON.parse(
                                            (e as Error).message,
                                        ) as FormErrorType,
                                    );
                                }
                            }}
                        >
                            Обновить
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Status;
