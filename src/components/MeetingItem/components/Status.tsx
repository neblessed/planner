import type { StatusType } from "../../../types/StatusType";
import "./Status.css";

type StatusProps = {
    status: StatusType;
};

const statusStyleMapping: Record<StatusType, string> = {
    Назначено: "assigned",
    Проведено: "completed",
    "Ждёт обработки": "pending",
    "В обработке": "processing",
    Сдано: "submitted",
};

function Status({ status }: StatusProps) {
    return (
        <span className={`meeting_status ${statusStyleMapping[status]}`}>
            {status}
        </span>
    );
}

export default Status;
