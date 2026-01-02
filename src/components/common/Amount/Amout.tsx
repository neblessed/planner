import "./Amout.css";

type AmoutProps = {
    amount: number;
    size: "small" | "medium" | "large";
};

function Amount({ amount, size = "medium" }: AmoutProps) {
    return (
        <span className={`amount ${size} ${amount < 0 ? "loss" : ""}`}>
            {amount} ₽
        </span>
    );
}

export default Amount;
