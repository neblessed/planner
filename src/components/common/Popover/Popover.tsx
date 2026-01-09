import type { ReactNode } from "react";
import { useRef } from "react";
import "./Popover.css";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

type PopoverProps = {
    title?: string;
    children: ReactNode | ReactNode[];
    isOpen?: boolean;
    onClose?: () => void;
};

function Popover({ title, children, isOpen = true, onClose }: PopoverProps) {
    const popoverRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(popoverRef, () => {
        if (onClose && isOpen) {
            onClose();
        }
    });

    if (!isOpen) return null;

    return (
        <div className="popover" ref={popoverRef}>
            {title && <span className="popover__title">{title}</span>}
            <div className="popover__content">{children}</div>
        </div>
    );
}

export default Popover;
