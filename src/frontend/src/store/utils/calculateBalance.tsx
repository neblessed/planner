import type { MeetingType } from "../../types/MeetingType";
import type { SpendingType } from "../../types/SpendingType";
import type { Balance } from "../types/BalanceType";

/**
 * Считает актуальный баланс аккаунта за периоды
 * @param initialBalance - стартовое значение баланса
 * @param meetings - массив со встречами (доходы)
 * @param spendings - массив с тратами (расходы)
 * @returns баланс за разные периоды
 */
export const calculateBalance = (
    meetings: MeetingType[],
    spendings: SpendingType[],
): Balance => {
    const now = new Date();
    const todayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
    );

    // Вычисляем даты начала периодов
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7); // 7 дней назад

    const monthStart = new Date(todayStart);
    monthStart.setMonth(monthStart.getMonth() - 1); // 1 месяц назад

    // Функция для фильтрации по периоду
    const filterByPeriod = <T extends { date: Date }>(
        items: T[],
        startDate: Date,
        endDate: Date = todayStart,
    ): T[] => {
        return items.filter((item) => {
            const itemDate = new Date(item.date);
            itemDate.setHours(0, 0, 0, 0);
            return itemDate >= startDate && itemDate <= endDate;
        });
    };

    // Подготавливаем данные
    const meetingsWithDates = meetings
        .filter((meeting) => meeting.amount != null)
        .map((meeting) => ({
            amount: meeting.amount || 0,
            date: new Date(meeting.date),
        }));

    const spendingsWithDates = spendings.map((spending) => ({
        amount: spending.amount,
        date: new Date(spending.date),
    }));

    // Фильтруем по периодам
    const weekMeetings = filterByPeriod(meetingsWithDates, weekStart);
    const weekSpendings = filterByPeriod(spendingsWithDates, weekStart);

    const monthMeetings = filterByPeriod(meetingsWithDates, monthStart);
    const monthSpendings = filterByPeriod(spendingsWithDates, monthStart);

    // Все встречи/траты
    const allMeetings = meetingsWithDates;
    const allSpendings = spendingsWithDates;

    // Вычисляем суммы
    const sumAmounts = <T extends { amount: number }>(items: T[]): number =>
        items.reduce((sum, item) => sum + item.amount, 0);

    const totalWeekMeetings = sumAmounts(weekMeetings);
    const totalWeekSpendings = sumAmounts(weekSpendings);

    const totalMonthMeetings = sumAmounts(monthMeetings);
    const totalMonthSpendings = sumAmounts(monthSpendings);

    const totalAllMeetings = sumAmounts(allMeetings);
    const totalAllSpendings = sumAmounts(allSpendings);

    return {
        all: {
            total: totalAllMeetings - totalAllSpendings,
            spendings: -totalAllSpendings,
        },
        month: {
            total: totalMonthMeetings - totalMonthSpendings,
            spendings: -totalMonthSpendings,
        },
        week: {
            total: totalWeekMeetings - totalWeekSpendings,
            spendings: -totalWeekSpendings,
        },
    };
};
