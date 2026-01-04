import type { MeetingType } from "../../types/MeetingType";
import Status from "./components/Status";
import "./MeetingItem.css";

type MeetingItemProps = Omit<MeetingType, "id">;

function MeetingItem({
    person,
    location,
    status,
    comment,
    links,
    amount,
    date,
}: MeetingItemProps) {
    const formattedDate = (date: string) => {
        const now = new Date();
        const d = new Date(date);
        const formatted = d.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            ...(now.getFullYear() !== d.getFullYear()
                ? { year: "2-digit" }
                : {}),
        });
        const time = d.toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
        });

        return `${formatted}, ${time}`;
    };
    return (
        <div className="meeting_row">
            <div className="meeting_row__info">
                <span className="meeting_row__person">{person}</span>
                <div className="meeting_row_liner" />
                <span className="meeting_row__date">{formattedDate(date)}</span>
                <div className="meeting_row_liner" />
                <Status status={status} />
            </div>
            <div className="meeting_row_liner" />
            <div className="meeting_row__links">
                <a
                    className="meeting_row__links_icon"
                    href={links.telegram}
                    target="_blank"
                >
                    <img src="./icons/telegram.svg" />
                </a>
                <a
                    className="meeting_row__links_icon_wfolio"
                    href={links.wfolio}
                    target="_blank"
                >
                    <img src="./icons/wfolio.svg" />
                </a>
            </div>
        </div>
    );
}

export default MeetingItem;
