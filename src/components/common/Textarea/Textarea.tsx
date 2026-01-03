import "./Textarea.css";

type TextareaProps = {
    label?: string;
    placeholder?: string;
    value: string;
    setValue: (e?: any) => void;
};

function Textarea({ label, placeholder = "", value, setValue }: TextareaProps) {
    return (
        <div className="textarea">
            {label && <span className="textarea__label">{label}:</span>}
            <textarea
                placeholder={placeholder}
                value={value}
                onChange={setValue}
            />
        </div>
    );
}

export default Textarea;
