import type { MeetingType } from "../../types/MeetingType";
import type { SpendingType } from "../../types/SpendingType";
import type { Balance } from "../types/BalanceType";

/**
 * Считает актуальный баланс аккаунта
 * @param initialBalance - стартовое значение баланса
 * @param meetings - массив со встречами
 * @param spendings - массив с тратами
 * @returns
 */
export const calculateBalance = (
    initialBalance: number,
    meetings: MeetingType[],
    spendings: SpendingType[]
): Balance => {
    const meetingsAmounts = meetings
        .filter((meeting) => meeting.amount)
        .map((meeting) => (meeting.amount ? meeting.amount : 0))
        .reduce((a, b) => a + b, initialBalance);

    const spendingsAmounts = spendings
        .map((spending) => spending.amount)
        .reduce((a, b) => a + b, 0);

    return {
        total: meetingsAmounts - spendingsAmounts,
        spendings: -spendingsAmounts,
    };
};
