import type { StatusType } from "../../../types/StatusType";
import Popover from "../../common/Popover/Popover";
import "./Status.css";

type StatusProps = {
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

function Status({ status, isOpen, setIsOpened }: StatusProps) {
    return (
        <div
            className={`meeting_status ${statusStyleMapping[status]}`}
            onClick={() => setIsOpened((prev) => !prev)}
        >
            {status}
            <Popover isOpen={isOpen} onClose={() => setIsOpened(false)}>
                <div className="popover_statuses">
                    {Object.keys(statusStyleMapping).map((s) => (
                        <span
                            className={`meeting_status ${statusStyleMapping[s]}`}
                        >
                            {s}
                        </span>
                    ))}
                </div>
            </Popover>
        </div>
    );
}

export default Status;
