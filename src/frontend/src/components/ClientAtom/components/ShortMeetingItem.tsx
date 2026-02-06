import { useCallback } from "react";
import { StatusType } from "../../../types/StatusType";
import "./ShortMeetingItem.css";

type ShortMeetingItemProps = {
    date: string;
    amount: string;
    status: StatusType;
};
function ShortMeetingItem({ date, amount, status }: ShortMeetingItemProps) {
    const formatDate = useCallback((dateString: string) => {
        const d = new Date(dateString);

        return d.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "long",
            ...(d.getFullYear() === new Date().getFullYear()
                ? {}
                : { year: "numeric" }),
        });
    }, []);

    return (
        <div className="short_meeting_item">
            <span className="short_meeting_item_date">{formatDate(date)}</span>
            <div className="shot_meeting_item_devider" />
            <div className="short_meeting_item_amount_block">
                <span className="short_meeting_item_amount">{amount}</span>
            </div>
            <div className="shot_meeting_item_devider" />
            <div className="short_meeting_item_status_block">
                <span className="short_meeting_item_status">{status}</span>
            </div>
        </div>
    );
}

export default ShortMeetingItem;
