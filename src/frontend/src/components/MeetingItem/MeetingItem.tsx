import { useState } from "react";
import type { MeetingType } from "../../../types/MeetingType";
import Status from "./components/Status";
import "./MeetingItem.css";
import CreationModal from "../modals/CreationModal/CreationModal";
import { rowBackgroundByStatus } from "./utils/getRowBackgroundByStatus";

type MeetingItemProps = {
    meeting: MeetingType;
    enableDeadlineCell?: boolean;
    isDisabled?: boolean;
};

function MeetingItem({
    meeting,
    enableDeadlineCell = true,
    isDisabled = false,
}: MeetingItemProps) {
    const {
        id,
        person,
        location,
        status,
        comment,
        links,
        amount,
        date,
        deadlineDate,
    } = meeting;
    const [commentOpened, setCommentOpened] = useState(false);
    const [isStatusOpened, setIsStatusOpened] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const formattedDate = (date: string, withTime = true) => {
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

        return `${formatted}${withTime ? `,  ${time}` : ""}`;
    };
    return (
        <div
            className={`${
                isDisabled ? "meeting_row_disabled" : "meeting_row"
            } ${rowBackgroundByStatus(status, date)}`}
        >
            <div className="meeting_row__info">
                <span
                    className="meeting_row__person meeting_row__item"
                    onClick={() => setIsEditModalOpen((prev) => !prev)}
                    hint-text="Имя клиента"
                >
                    {person}
                </span>
                <div className="meeting_row_liner" />
                <span
                    className="meeting_row__date meeting_row__item"
                    onClick={() => setIsEditModalOpen((prev) => !prev)}
                    hint-text="Дата съемки"
                >
                    {formattedDate(date)}
                </span>
                {enableDeadlineCell && (
                    <>
                        <div className="meeting_row_liner" />
                        <div
                            className={`meeting_row__item ${
                                deadlineDate ? "meeting_row__deadline_cell" : ""
                            }`}
                            style={!deadlineDate ? { width: "80px" } : {}}
                            hint-text="Дедлайн сдачи"
                        >
                            <span
                                className={`${
                                    deadlineDate ? "meeting_row__deadline" : ""
                                }`}
                            >
                                {deadlineDate
                                    ? formattedDate(deadlineDate, false)
                                    : ""}
                            </span>
                        </div>
                    </>
                )}
                <div className="meeting_row_liner" />
                <div className="meeting_row_status">
                    <Status
                        id={id}
                        status={status}
                        setIsOpened={setIsStatusOpened}
                        isOpen={isStatusOpened}
                    />
                </div>
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
                {links.wfolio && (
                    <>
                        {" "}
                        <a
                            className="meeting_row__links_icon_wfolio"
                            href={links.wfolio}
                            target="_blank"
                        >
                            <img src="./icons/wfolio.svg" />
                        </a>
                    </>
                )}
            </div>
            <div className="meeting_row_liner" />
            <div className="meeting_row__additional">
                {location && (
                    <span
                        className="meeting_row__additional_location meeting_row__item"
                        onClick={() => setIsEditModalOpen((prev) => !prev)}
                        hint-text="Место съемки"
                    >
                        {location}
                    </span>
                )}
                <>
                    <div className="meeting_row_liner" />
                    <div className="meeting_row__aditional_amount_cell">
                        {amount || amount === 0 ? (
                            <span
                                className="meeting_row__additional_amount meeting_row__item"
                                onClick={() =>
                                    setIsEditModalOpen((prev) => !prev)
                                }
                                hint-text="Стоимость съемки"
                            >
                                {amount}
                            </span>
                        ) : null}
                    </div>
                </>
                <div className="meeting_row_liner" />
                {comment ? (
                    <>
                        <div className="meeting_row__additional_comment">
                            <a
                                className="meeting_row__additional_comment_icon"
                                comment-text={comment}
                            >
                                <img
                                    className="meeting_row__additional_comment_icon"
                                    src="./icons/comment.svg"
                                    onClick={() =>
                                        setCommentOpened((prev) => !prev)
                                    }
                                />
                            </a>
                        </div>
                    </>
                ) : (
                    <div className="meeting_row__additional_comment" />
                )}
            </div>
            {isEditModalOpen && (
                <CreationModal setOpen={setIsEditModalOpen} meeting={meeting} />
            )}
        </div>
    );
}

export default MeetingItem;
