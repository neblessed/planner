import "./MeetingItem.css";
import type { MeetingType } from "../../types/MeetingType";

type MeetingItemProps = Omit<MeetingType, "location" | "id" | "status">;

const formatTime = (date: Date) => {
    return `${date.getHours()}:${date.getMinutes()}`;
};

function MeetingItem({ person, date, links }: MeetingItemProps) {
    const { telegram } = links;

    return (
        <div className="meeting_row">
            <div className="meeting_row__info">
                <div className="meeting_row__bullet" />
                <span className="meeting_row__person">{person}</span>
                <a
                    className="meeting_row__telegram"
                    href={telegram}
                    target="_blank"
                >
                    <img src="./icons/telegram.svg" />
                </a>
            </div>
            <div className="meeting_row__date">
                <span className="meeting_row__time">{formatTime(date)}</span>
            </div>
        </div>
    );
}

export default MeetingItem;
