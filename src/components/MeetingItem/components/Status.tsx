import { useAppDispatch } from "../../../hooks/redux";
import { updateMeeting } from "../../../store/slice/meetings.slice";
import type { MeetingType } from "../../../types/MeetingType";
import type { StatusType } from "../../../types/StatusType";
import Popover from "../../common/Popover/Popover";
import "./Status.css";

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
                            key={s}
                            className={`meeting_status ${statusStyleMapping[s]}`}
                            onClick={() =>
                                dispatch(
                                    updateMeeting({
                                        id,
                                        status: s as StatusType,
                                    })
                                )
                            }
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
