type PeriodBalance = {
    total: number;
    spendings: number;
};

export type Balance = {
    all: PeriodBalance;
    month: PeriodBalance;
    week: PeriodBalance;
};
