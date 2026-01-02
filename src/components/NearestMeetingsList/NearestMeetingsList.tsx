import Block from "../common/Block/Block";
import MeetingItem from "../MeetingItem/MeetingItem";
import "./NearestMeetingsList.css";
import type { MeetingType } from "../../types/MeetingType";

/** Блок со списком ближайших встреч */
function NearestMeetingsList() {
    const emptyText = () => {
        return <span className="empty_list_text">Ближайших встреч нет 😕</span>;
    };

    const NearestMeetingsBlock = (title: string, meetings: MeetingType[]) => {
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
        <Block title="Ближайшие встречи">
            <MeetingItem
                person="Vadim T."
                date={new Date()}
                links={{ telegram: "https://t.me/neblessed" }}
            />
            <MeetingItem
                person="Julia K."
                date={new Date()}
                links={{ telegram: "https://t.me/neblessed" }}
            />
            <MeetingItem
                person="Arnold S."
                date={new Date()}
                links={{ telegram: "https://t.me/neblessed" }}
            />
            <MeetingItem
                person="Tom K."
                date={new Date()}
                links={{ telegram: "https://t.me/neblessed" }}
            />
        </Block>
    );
}

export default NearestMeetingsList;
