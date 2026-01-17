/**
 * Валидирует форму изменения статуса
 * @param data - данные с формы
 */
export const validateStatusForm = (data: {
    amount?: string | null;
    wfolio?: string | null;
}) => {
    if (data.amount && Number(data.amount) <= 0) {
        throw new Error(
            JSON.stringify({
                field: "status-amount",
                message: "Некорректная сумма",
            })
        );
    }

    if (
        (data.wfolio && data.wfolio === null) ||
        (data.wfolio !== null && data.wfolio!.length <= 10)
    ) {
        throw new Error(
            JSON.stringify({
                field: "status-wfolio",
                message: "Некорректная ссылка на wfolio",
            })
        );
    }
};
