import type { Balance } from "../../../../store/types/BalanceType";

export const getBalanceByPeriod = (
    balance: Balance,
    period: "week" | "month" | "all",
) => {
    return balance[period];
};
