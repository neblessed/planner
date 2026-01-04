import { useState } from "react";
import Modal from "../../common/Modal/Modal";
import "./CreationModal.css";
import MeetingForm from "./components/MeetingForm";
import SpendingForm from "./components/SpendingForm";

type CreationModalProps = {
    setClose: (state: boolean) => void;
};

function CreationModal({ setClose }: CreationModalProps) {
    const [creationType, setCreationType] = useState<"meeting" | "spending">(
        "meeting"
    );
    return (
        <Modal title="Создание записи" setOpen={setClose}>
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
            <div className="modal_form">
                {creationType === "meeting" && <MeetingForm />}
                {creationType === "spending" && <SpendingForm />}
            </div>
        </Modal>
    );
}

export default CreationModal;
