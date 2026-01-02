import type { ReactNode } from "react";
import "./Block.css";

type BlockProps = {
    title: string;
    children: ReactNode | ReactNode[];
};

function Block({ title, children }: BlockProps) {
    return (
        <div className="block">
            <div className="block__header">
                <div className="block__controls">
                    <img src="./icons/close.svg" />
                    <img src="./icons/hide.svg" />
                    <img src="./icons/full.svg" />
                </div>
                <label className="block__label">{title}</label>
            </div>
            <div className="block__content">{children}</div>
        </div>
    );
}

export default Block;
