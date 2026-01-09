import { useAppSelector } from "../../hooks/redux";
import Block from "../common/Block/Block";
import MeetingItem from "../MeetingItem/MeetingItem";

function CompletedBlock() {
    const { meetings } = useAppSelector((store) => store.meetingsReducer);
    const completedMeetings = meetings
        .filter((meeting) => meeting.status === "Сдано")
        .sort(
            (m1, m2) =>
                new Date(m2.date).getTime() - new Date(m1.date).getTime()
        );
    return (
        <>
            <Block title="Завершенные записи ✅" wide={true}>
                {completedMeetings.length > 0 ? (
                    completedMeetings.map((meeting) => {
                        return <MeetingItem key={meeting.id} {...meeting} />;
                    })
                ) : (
                    <span className="empty_list_text">
                        Нет завершенных записей
                    </span>
                )}
            </Block>
        </>
    );
}

export default CompletedBlock;
