import type { StatusType } from "../../../../types/StatusType";

export const rowBackgroundByStatus = (status: StatusType, date: string) => {
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
