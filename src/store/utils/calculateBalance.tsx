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
    const meetingsWithAmountsAndDates = meetings
        .filter((meeting) => meeting.amount)
        .map((meeting) => {
            return {
                amount: meeting.amount ? meeting.amount : 0,
                date: new Date(meeting.date),
            };
        });

    const spendingsAmountsWithDates = spendings.map((spending) => {
        return {
            amount: spending.amount,
            date: new Date(spending.date),
        };
    });

    const weekMeetingsAmounts: number[] = [];
    const weekSpendingsAmounts: number[] = [];
    const monthMeetingsAmounts: number[] = [];
    const monthSpendingsAmounts: number[] = [];

    meetingsWithAmountsAndDates.forEach((meeting) => {
        const currentDate = new Date();
        const meetingDate = meeting.date;

        // Обнуляем время чтобы сравнивать дни, месяцы, недели
        currentDate.setHours(0, 0, 0, 0);
        meetingDate.setHours(0, 0, 0, 0);

        // Прибавляем 7 дней к текущей дате и смотрим совпадения
        currentDate.setDate(currentDate.getDate() + 7);

        if (currentDate >= meetingDate) {
            weekMeetingsAmounts.push(meeting.amount);
        }

        // Забираем обратно 7 дней
        currentDate.setDate(currentDate.getDate() - 7);

        // Теперь добавляем месяц
        currentDate.setMonth(currentDate.getMonth() + 1);

        if (currentDate >= meetingDate) {
            monthMeetingsAmounts.push(meeting.amount);
        }
    });

    spendingsAmountsWithDates.forEach((spending) => {
        const currentDate = new Date();
        const meetingDate = spending.date;

        // Обнуляем время чтобы сравнивать дни, месяцы, недели
        currentDate.setHours(0, 0, 0, 0);
        meetingDate.setHours(0, 0, 0, 0);

        // Прибавляем 7 дней к текущей дате и смотрим совпадения
        currentDate.setDate(currentDate.getDate() + 7);

        if (currentDate >= meetingDate) {
            weekSpendingsAmounts.push(spending.amount);
        }

        // Забираем обратно 7 дней
        currentDate.setDate(currentDate.getDate() - 7);

        // Теперь добавляем месяц
        currentDate.setMonth(currentDate.getMonth() + 1);

        if (currentDate >= meetingDate) {
            monthSpendingsAmounts.push(spending.amount);
        }
    });

    const allPeriodSpendings = spendingsAmountsWithDates
        .map((s) => s.amount)
        .reduce((a, b) => a + b, 0);

    return {
        all: {
            total:
                meetingsWithAmountsAndDates
                    .map((m) => m.amount)
                    .reduce((a, b) => a + b, initialBalance) -
                allPeriodSpendings,
            spendings: -allPeriodSpendings,
        },
        month: {
            total:
                monthMeetingsAmounts.reduce((a, b) => a + b, 0) -
                monthSpendingsAmounts.reduce((a, b) => a + b, 0),
            spendings: -monthSpendingsAmounts.reduce((a, b) => a + b, 0),
        },
        week: {
            total:
                weekMeetingsAmounts.reduce((a, b) => a + b, 0) -
                weekSpendingsAmounts.reduce((a, b) => a + b, 0),
            spendings: -weekSpendingsAmounts.reduce((a, b) => a + b, 0),
        },
    };
};
