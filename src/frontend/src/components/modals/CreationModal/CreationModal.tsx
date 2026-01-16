import { useState } from "react";
import Modal from "../../common/Modal/Modal";
import "./CreationModal.css";
import MeetingForm from "./components/MeetingForm";
import SpendingForm from "./components/SpendingForm";
import type { MeetingType } from "../../../../types/MeetingType";
import UpdateMeetingForm from "./components/UpdateMeetingForm";

type CreationModalProps = {
    setOpen: (state: boolean) => void;
    meeting?: MeetingType;
};

function CreationModal({ setOpen, meeting }: CreationModalProps) {
    const [creationType, setCreationType] = useState<"meeting" | "spending">(
        "meeting",
    );
    return (
        <Modal
            title={meeting ? "Изменение записи" : "Создание записи"}
            setOpen={setOpen}
        >
            {!meeting && (
                <div className="modal_block__controls">
                    <div className="modal_block__switcher">
                        <span
                            className={`modal_block__switcher_option ${
                                creationType === "meeting"
                                    ? "modal_switcher_selected"
                                    : ""
                            }`}
                            onClick={() => setCreationType("meeting")}
                        >
                            Встреча
                        </span>
                        <div className="modal_block__switcher_line" />
                        <span
                            className={`modal_block__switcher_option ${
                                creationType === "spending"
                                    ? "modal_switcher_selected"
                                    : ""
                            }`}
                            onClick={() => setCreationType("spending")}
                        >
                            Расходы
                        </span>
                    </div>
                </div>
            )}
            <div className="modal_form">
                {meeting && (
                    <UpdateMeetingForm meeting={meeting} setOpen={setOpen} />
                )}
                {creationType === "meeting" && !meeting ? (
                    <MeetingForm setOpen={setOpen} />
                ) : null}
                {creationType === "spending" && !meeting ? (
                    <SpendingForm setOpen={setOpen} />
                ) : null}
            </div>
        </Modal>
    );
}

export default CreationModal;
