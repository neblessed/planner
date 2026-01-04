import type { MeetingType } from "../../../../types/MeetingType";
import { CreationFormError } from "../enum/errors.enum";

export const validateForm = (meeting: MeetingType) => {
    if (meeting.person.length === 0) {
        throw new Error(
            JSON.stringify({
                field: "person",
                message: CreationFormError.emptyPerson,
            })
        );
    }

    if (meeting.links.telegram.replace("https://t.me/", "").length === 0) {
        throw new Error(
            JSON.stringify({
                field: "telegram",
                message: CreationFormError.emptyTelegram,
            })
        );
    }

    if (meeting.location.length === 0) {
        throw new Error(
            JSON.stringify({
                field: "location",
                message: CreationFormError.emptyLocation,
            })
        );
    }

    if (!meeting.date) {
        throw new Error(
            JSON.stringify({
                field: "date",
                message: CreationFormError.emptyDate,
            })
        );
    }
};
