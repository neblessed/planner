import type { HTMLInputTypeAttribute } from "react";
import "./Field.css";

type FieldProps = {
    label: string;
    placeholder?: string;
    value: string;
    setValue: (value: string) => void;
    type?: HTMLInputTypeAttribute;
    error?: string;
};

function Field({
    label,
    placeholder = "",
    value,
    setValue,
    type = "text",
    error,
}: FieldProps) {
    return (
        <div className="field">
            <span className="field__label">{label}:</span>
            <input
                type={type}
                placeholder={placeholder}
                value={type === "number" && value === "0" ? "" : value}
                onChange={(e) => setValue(e.target.value)}
                className={error ? "input-error" : ""}
            />
        </div>
    );
}

export default Field;
