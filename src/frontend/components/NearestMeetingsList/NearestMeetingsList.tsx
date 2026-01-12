import Block from "../common/Block/Block";
import NearestMeetingItem from "../NearestMeetingItem/NearestMeetingItem";
import "./NearestMeetingsList.css";
import type { MeetingType } from "../../types/MeetingType";
import { useAppSelector } from "../../hooks/redux";
import { separateNearest } from "./utils/separateNearest";

const EmptyText = () => {
    return <span className="empty_list_text">Ближайших записей нет 👀</span>;
};

const NearestMeetingsBlock = ({
    title,
    meetings,
}: {
    title: string;
    meetings: MeetingType[];
}) => {
    return (
        <div className="meeting_day_block">
            <span className="meeting_day_block__title">{title}:</span>
            <div className="meeting_day_block__items">
                {meetings
                    // Сортируем по возрастанию
                    .sort((a, b) => {
                        const dateA = new Date(a.date).getTime();
                        const dateB = new Date(b.date).getTime();
                        return dateA - dateB;
                    })
                    // Трансформируем в MeetngItem
                    .map((meeting) => (
                        <NearestMeetingItem
                            key={meeting.id}
                            person={meeting.person}
                            date={meeting.date}
                            links={meeting.links}
                        />
                    ))}
            </div>
        </div>
    );
};

/** Блок со списком ближайших встреч */
function NearestMeetingsList() {
    const { meetings } = useAppSelector((store) => store.meetingsReducer);
    const separatedMeetings = separateNearest(meetings);

    return (
        <Block title="Ближайшие записи">
            <div className="meeting_days">
                {Object.keys(separatedMeetings).map((key) => {
                    const meetingsArray = separatedMeetings[key];

                    if (key === "one" && meetingsArray.length > 0) {
                        return (
                            <NearestMeetingsBlock
                                key={key}
                                title="Сегодня"
                                meetings={meetingsArray}
                            />
                        );
                    }

                    if (key === "two" && meetingsArray.length > 0) {
                        return (
                            <NearestMeetingsBlock
                                key={key}
                                title="Завтра"
                                meetings={meetingsArray}
                            />
                        );
                    }

                    if (meetingsArray.length > 0) {
                        return (
                            <NearestMeetingsBlock
                                key={key}
                                title={new Date(
                                    meetingsArray[0].date
                                ).toLocaleDateString("ru-RU", {
                                    weekday: "long",
                                    day: "numeric",
                                })}
                                meetings={meetingsArray}
                            />
                        );
                    }
                })}
            </div>
            {!Object.keys(separatedMeetings).some(
                (s) => separatedMeetings[s].length > 0
            ) && <EmptyText />}
        </Block>
    );
}

export default NearestMeetingsList;
