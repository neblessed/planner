import type { ReactNode } from "react";
import "./Modal.css";

type ModalProps = {
    title: string;
    children: ReactNode | ReactNode[];
    setOpen: (state: boolean) => void;
};

function Modal({ title, children, setOpen }: ModalProps) {
    return (
        <div className="overlay">
            <div className="modal">
                <div className="modal__header">
                    <div
                        className="modal__header_controls"
                        onClick={() => setOpen(false)}
                    >
                        <img src="./icons/close.svg" />
                        <img src="./icons/hide.svg" />
                        <img src="./icons/full.svg" />
                    </div>
                    <span className="modal__header_title">{title}</span>
                </div>
                <div className="modal__content">{children}</div>
            </div>
        </div>
    );
}

export default Modal;
