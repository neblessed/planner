import { useState } from "react";
import type { MeetingType } from "../../types/MeetingType";
import Popover from "../common/Popover/Popover";
import Status from "./components/Status";
import "./MeetingItem.css";
import CreationModal from "../modals/CreationModal/CreationModal";
import { getDeadlineDays } from "./utils/getDeadlineDays";
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
        <div
            className={`${
                isDisabled ? "meeting_row_disabled" : "meeting_row"
            } ${rowBackgroundByStatus(status, date)}`}
        >
            <div className="meeting_row__info">
                <span
                    className="meeting_row__person"
                    onClick={() => setIsEditModalOpen((prev) => !prev)}
                >
                    {person}
                </span>
                <div className="meeting_row_liner" />
                <span
                    className="meeting_row__date"
                    onClick={() => setIsEditModalOpen((prev) => !prev)}
                >
                    {formattedDate(date)}
                </span>
                {enableDeadlineCell && (
                    <>
                        <div className="meeting_row_liner" />
                        <span
                            className={`${
                                deadlineDate ? "meeting_row__deadline" : ""
                            }`}
                            style={{ width: "20px" }}
                        >
                            {deadlineDate ? getDeadlineDays(deadlineDate) : ""}
                        </span>
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
                        className="meeting_row__additional_location"
                        onClick={() => setIsEditModalOpen((prev) => !prev)}
                    >
                        {location}
                    </span>
                )}
                {amount || amount === 0 ? (
                    <>
                        <div className="meeting_row_liner" />
                        <span
                            className="meeting_row__additional_amount"
                            onClick={() => setIsEditModalOpen((prev) => !prev)}
                        >
                            {amount}
                        </span>
                    </>
                ) : null}
                {comment && (
                    <>
                        <div className="meeting_row_liner" />
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
                    </>
                )}
            </div>
            {isEditModalOpen && (
                <CreationModal setOpen={setIsEditModalOpen} meeting={meeting} />
            )}
        </div>
    );
}

export default MeetingItem;
