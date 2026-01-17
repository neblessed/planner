import { MeetingType } from "../../types/MeetingType";
import "./NearestMeetingItem.css";

type NearestMeetingItemProps = Omit<MeetingType, "location" | "id" | "status">;

function NearestMeetingItem({ person, date, links }: NearestMeetingItemProps) {
    const { telegram } = links;

    return (
        <div className="nearest_meeting_row">
            <div className="nearest_meeting_row__info">
                <div className="nearest_meeting_row__bullet" />
                <span className="nearest_meeting_row__person">{person}</span>
                <a
                    className="nearest_meeting_row__telegram"
                    href={telegram}
                    target="_blank"
                >
                    <img src="./icons/telegram.svg" />
                </a>
            </div>
            <div className="nearest_meeting_row__date">
                <span className="nearest_meeting_row__time">
                    {new Date(date).toLocaleTimeString("ru-RU", {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </span>
            </div>
        </div>
    );
}

export default NearestMeetingItem;
