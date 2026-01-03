import Block from "../common/Block/Block";
import MeetingItem from "../MeetingItem/MeetingItem";
import "./NearestMeetingsList.css";
import type { MeetingType } from "../../types/MeetingType";
import { useAppSelector } from "../../hooks/redux";
import { separateNearest } from "./utils/separateNearest";

/** Блок со списком ближайших встреч */
function NearestMeetingsList() {
    const { meetings } = useAppSelector((store) => store.meetingsReducer);
    const separatedMeetings = separateNearest(meetings);

    const EmptyText = () => {
        return (
            <span className="empty_list_text">Ближайших записей нет 👀</span>
        );
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
                            <MeetingItem
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

    return (
        <Block title="Ближайшие записи">
            <div className="meeting_days">
                {separatedMeetings.today.length > 0 && (
                    <NearestMeetingsBlock
                        title="Сегодня"
                        meetings={separatedMeetings.today}
                    />
                )}
                {separatedMeetings.tomorrow.length > 0 && (
                    <NearestMeetingsBlock
                        title="Завтра"
                        meetings={separatedMeetings.tomorrow}
                    />
                )}
            </div>
            {separatedMeetings.today.length === 0 &&
                separatedMeetings.tomorrow.length === 0 && <EmptyText />}
        </Block>
    );
}

export default NearestMeetingsList;
