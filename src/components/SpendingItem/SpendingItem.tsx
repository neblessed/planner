import type { SpendingType } from "../../types/SpendingType";
import "./SpendingItem.css";

type SpendingItemProps = {
    spending: SpendingType;
};

function SpendingItem({ spending }: SpendingItemProps) {
    return (
        <div className="spending_row">
            <span className="spending_row__title">{spending.spending}</span>
            <div className="spending_row__liner" />
            <span className="spending_row__date">
                {new Date(spending.date).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "long",
                })}
            </span>
            <div className="spending_row__liner" />
            <span className="spending_row__amount">{spending.amount}</span>
        </div>
    );
}

export default SpendingItem;
