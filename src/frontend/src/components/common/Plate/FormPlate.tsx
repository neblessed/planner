import { ReactNode } from "react";
import "./FormPlate.css";

interface FormPlateProps {
    title: string;
    children: ReactNode | ReactNode[];
    contentGap?: string;
    hintText?: string;
}

const FormPlate: React.FC<FormPlateProps> = ({
    title,
    contentGap = "5px",
    hintText,
    children,
}) => {
    return (
        <div className="plate">
            <div className="plate_head">
                <span className="plate_title">{title}</span>
                {hintText && (
                    <span className="plate_info" plate-info={hintText}>
                        <img src="icons/info.svg" />
                    </span>
                )}
            </div>
            <div className="plate_content" style={{ gap: contentGap }}>
                {children}
            </div>
        </div>
    );
};

export default FormPlate;
