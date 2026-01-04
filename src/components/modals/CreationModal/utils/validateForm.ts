import type { MeetingType } from "../../../../types/MeetingType";
import type { SpendingType } from "../../../../types/SpendingType";
import { CreationFormError } from "../enum/errors.enum";

export const validateForm = (object: MeetingType | SpendingType) => {
    if ("person" in object) {
        if (object.person.length === 0) {
            throw new Error(
                JSON.stringify({
                    field: "person",
                    message: CreationFormError.emptyPerson,
                })
            );
        }

        if (object.links.telegram.replace("https://t.me/", "").length === 0) {
            throw new Error(
                JSON.stringify({
                    field: "telegram",
                    message: CreationFormError.emptyTelegram,
                })
            );
        }

        if (object.location.length === 0) {
            throw new Error(
                JSON.stringify({
                    field: "location",
                    message: CreationFormError.emptyLocation,
                })
            );
        }

        if (object.date.length <= 1) {
            throw new Error(
                JSON.stringify({
                    field: "date",
                    message: CreationFormError.emptyDate,
                })
            );
        }
    } else {
        if (object.spending.length === 0) {
            throw new Error(
                JSON.stringify({
                    field: "spending",
                    message: CreationFormError.emptySpending,
                })
            );
        }

        if (object.date.length <= 1) {
            throw new Error(
                JSON.stringify({
                    field: "date",
                    message: CreationFormError.emptyDateWithoutTime,
                })
            );
        }

        if (object.amount <= 0) {
            throw new Error(
                JSON.stringify({
                    field: "amount",
                    message: CreationFormError.emptyAmount,
                })
            );
        }
    }
};
