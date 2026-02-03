import { StatusType } from "../../../types/StatusType";
import "./ShortMeetingItem.css";

type ShortMeetingItemProps = {
    date: string;
    amount: string;
    status: StatusType;
};
function ShortMeetingItem({ date, amount, status }: ShortMeetingItemProps) {
    return (
        <div className="short_meeting_item">
            <span className="short_meeting_item_date">{date}</span>
            <span className="short_meeting_item_amount">{amount}</span>
            <span className="short_meeting_item_status">{status}</span>
        </div>
    );
}

export default ShortMeetingItem;
