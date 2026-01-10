export const getDeadlineDays = (deadlineDate: string | Date): number => {
    const currentDate = new Date();
    const deadline = new Date(deadlineDate);

    // Сбрасываем время до 00:00:00 для точного сравнения дней
    currentDate.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    // Разница в миллисекундах
    const diffTime = deadline.getTime() - currentDate.getTime();

    // Конвертируем в дни (округление в меньшую сторону для "полных дней")
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};
