import type { Balance } from "../../../store/types/BalanceType";

export const getBalanceByPeriod = (
    balance: Balance | null,
    period: "week" | "month" | "all",
) => {
    // Защита от null
    if (!balance) {
        return { total: 0, spendings: 0 };
    }

    return balance[period];
};
