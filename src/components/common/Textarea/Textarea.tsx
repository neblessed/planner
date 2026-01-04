import "./Textarea.css";

type TextareaProps = {
    label?: string;
    placeholder?: string;
    value: string;
    setValue: (value: string) => void;
};

function Textarea({ label, placeholder = "", value, setValue }: TextareaProps) {
    return (
        <div className="textarea">
            {label && <span className="textarea__label">{label}:</span>}
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}

export default Textarea;
