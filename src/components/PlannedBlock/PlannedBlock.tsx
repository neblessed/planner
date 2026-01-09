import { useAppSelector } from "../../hooks/redux";
import Block from "../common/Block/Block";
import MeetingItem from "../MeetingItem/MeetingItem";

function PlannedBlock() {
    const { meetings } = useAppSelector((store) => store.meetingsReducer);

    const plannedMeetings = meetings
        .filter(
            (meeting) =>
                meeting.status === "Назначено" || meeting.status === "Проведено"
        )
        .sort(
            (m1, m2) =>
                new Date(m2.date).getTime() - new Date(m1.date).getTime()
        );

    return (
        <>
            <Block title="Запланировано 📅" wide={true}>
                {plannedMeetings.length > 0 ? (
                    plannedMeetings.map((meeting) => {
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

export default PlannedBlock;
