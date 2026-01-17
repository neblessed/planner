import { useState } from "react";
import type { SpendingType } from "../../types/SpendingType";
import "./SpendingItem.css";
import { useAppDispatch } from "../../hooks/redux";
import { deleteExistedSpending } from "../../store/thunks/spending.thunk";

type SpendingItemProps = {
    spending: SpendingType;
};

function SpendingItem({ spending }: SpendingItemProps) {
    const dispatch = useAppDispatch();

    return (
        <div className="spending_row">
            <div className="spending_row__data">
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
            <img
                className="spending_row__delete"
                src="./icons/trash.svg"
                onClick={() => {
                    dispatch(deleteExistedSpending(spending.id));
                }}
            />
        </div>
    );
}

export default SpendingItem;
