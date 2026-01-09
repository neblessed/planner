import { useAppSelector } from "../../hooks/redux";
import Block from "../common/Block/Block";
import MeetingItem from "../MeetingItem/MeetingItem";

function InProgressBlock() {
    const { meetings } = useAppSelector((store) => store.meetingsReducer);
    const inProgressMeetings = meetings.filter(
        (meeting) =>
            meeting.status === "Ждёт обработки" ||
            meeting.status === "В обработке"
    );
    return (
        <>
            <Block title="В работе 💻">
                {inProgressMeetings.length > 0 ? (
                    inProgressMeetings.map((meeting) => {
                        return <MeetingItem key={meeting.id} {...meeting} />;
                    })
                ) : (
                    <span className="empty_list_text">
                        Нет запланированных записей
                    </span>
                )}
            </Block>
        </>
    );
}

export default InProgressBlock;
