import type { HTMLInputTypeAttribute } from "react";
import "./Field.css";

type FieldProps = {
    label: string;
    placeholder?: string;
    value: string;
    setValue: (value: string) => void;
    type?: HTMLInputTypeAttribute;
};

function Field({
    label,
    placeholder = "",
    value,
    setValue,
    type = "text",
}: FieldProps) {
    return (
        <div className="field">
            <span className="field__label">{label}:</span>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}

export default Field;
