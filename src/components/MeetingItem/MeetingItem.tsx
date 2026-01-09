import { useState } from "react";
import type { MeetingType } from "../../types/MeetingType";
import Popover from "../common/Popover/Popover";
import Status from "./components/Status";
import "./MeetingItem.css";
import type { StatusType } from "../../types/StatusType";
import CreationModal from "../modals/CreationModal/CreationModal";

const rowBackgroundByStatus = (status: StatusType, date: string) => {
    const isCurrentDateLaterThanMeetingDate =
        Date.now() > new Date(date).getTime();

    if (status === "Назначено" && isCurrentDateLaterThanMeetingDate) {
        return "meeting_row_red";
    }

    if (status === "Проведено") {
        return "meeting_row_yellow";
    }

    return "";
};

function MeetingItem(props: MeetingType) {
    const { id, person, location, status, comment, links, amount, date } =
        props;
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
        <div className={`meeting_row ${rowBackgroundByStatus(status, date)}`}>
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
                        <img
                            className="meeting_row__additional_comment_icon"
                            src="./icons/comment.svg"
                            onClick={() => setCommentOpened((prev) => !prev)}
                        />
                        <Popover
                            title="Комментарий"
                            isOpen={commentOpened}
                            onClose={() => setCommentOpened(false)}
                        >
                            <span className="meeting_row__additional_comment">
                                {comment}
                            </span>
                        </Popover>
                    </>
                )}
            </div>
            {isEditModalOpen && (
                <CreationModal setOpen={setIsEditModalOpen} meeting={props} />
            )}
        </div>
    );
}

export default MeetingItem;
