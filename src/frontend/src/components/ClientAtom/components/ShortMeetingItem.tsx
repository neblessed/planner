import { useCallback } from "react";
import { StatusType } from "../../../types/StatusType";
import "./ShortMeetingItem.css";

type ShortMeetingItemProps = {
    date: string;
    amount?: number;
    status: StatusType;
    wfolio?: string;
};

const statusStyleMapping: Record<StatusType, string> = {
    Назначено: "assigned",
    Проведено: "completed",
    "Ждёт обработки": "pending",
    "В обработке": "processing",
    Сдано: "submitted",
};

function ShortMeetingItem({
    date,
    amount = 0,
    status,
    wfolio,
}: ShortMeetingItemProps) {
    const formatDate = useCallback((dateString: string) => {
        const d = new Date(dateString);

        return d.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            ...(new Date().getFullYear() !== d.getFullYear()
                ? { year: "numeric" }
                : {}),
        });
    }, []);

    return (
        <div className="short_meeting_item">
            {wfolio && (
                <a
                    className="short_meeting__links_icon_wfolio"
                    href={wfolio}
                    target="_blank"
                >
                    <img src="./icons/wfolio.svg" />
                </a>
            )}
            <span className="short_meeting_item_date">{formatDate(date)}</span>
            <div className="shot_meeting_item_devider" />
            <div className="short_meeting_item_amount_block">
                <span className="short_meeting_item_amount">{amount}</span>
            </div>
            <div className="shot_meeting_item_devider" />
            <div className="short_meeting_item_status_block">
                <span
                    className={`meeting_status ${statusStyleMapping[status]}`}
                >
                    {status}
                </span>
            </div>
        </div>
    );
}

export default ShortMeetingItem;
