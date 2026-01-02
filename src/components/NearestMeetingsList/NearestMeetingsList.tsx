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
            <>
                {meetings.map((meeting) => (
                    <MeetingItem
                        key={meeting.id}
                        person={meeting.person}
                        date={meeting.date}
                        links={meeting.links}
                    />
                ))}
            </>
        );
    };

    return (
        <Block title="Ближайшие записи">
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
            {separatedMeetings.today.length === 0 &&
                separatedMeetings.tomorrow.length === 0 && <EmptyText />}
        </Block>
    );
}

export default NearestMeetingsList;
