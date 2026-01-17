import { useEffect, useState } from "react";
import Amount from "../common/Amount/Amout";
import Block from "../common/Block/Block";
import "./Balance.css";
import Popover from "../common/Popover/Popover";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setupGoal } from "../../store/slice/meetings.slice";
import { getBalanceByPeriod } from "./utils/getBalanceByPeriod";
import { fetchGoal, renewGoal } from "../../store/thunks/goal.thunk";

/** Блок балансом */
function Balance() {
    const dispatch = useAppDispatch();

    // Проверь имя редьюсера в store!
    const { balance, goal, loading, error } = useAppSelector(
        (store) => store.meetingsReducer,
    );
    // ИЛИ store.meetingsSlice или store.meetingsReducer - смотри в store/index.ts

    const [period, setPeriod] = useState<"week" | "month" | "all">("all");
    const [goalOpened, setGoalOpened] = useState(false);
    const [tempGoal, setTempGoal] = useState(goal || 0);

    // Защита от null/undefined
    const safeBalance = balance || {
        all: { total: 0, spendings: 0 },
        week: { total: 0, spendings: 0 },
        month: { total: 0, spendings: 0 },
    };

    const balanceByPeriod = getBalanceByPeriod(safeBalance, period);
    const progress = (safeBalance.all.total / (tempGoal || 1)) * 100;

    // Синхронизируем tempGoal при изменении goal из store
    useEffect(() => {
        setTempGoal(goal || 0);
    }, [goal]);

    const handleSetGoal = async () => {
        if (!tempGoal || tempGoal <= 0) {
            const input = document.getElementsByClassName(
                "balance_popover_content__input",
            );
            input[0]?.classList.add("input-error");
            return;
        }

        try {
            await dispatch(renewGoal(tempGoal)).unwrap();
            setGoalOpened(false);
        } catch (error) {
            console.error("Failed to update goal:", error);
            // Можно показать уведомление об ошибке
        }
    };

    // Показываем заглушку если данные не загружены
    if (!balance && loading) {
        return (
            <Block title="Мой баланс">
                <div className="balance_block">
                    <div className="balance_block__amounts">
                        <Amount amount={0} size="large" />
                    </div>
                    <div className="balance_loading">Загрузка баланса...</div>
                </div>
            </Block>
        );
    }

    return (
        <Block title="Мой баланс">
            <div className="balance_block">
                <div className="balance_block__amounts">
                    <Amount amount={balanceByPeriod.total} size="large" />
                    {balanceByPeriod.spendings < 0 && (
                        <Amount
                            amount={balanceByPeriod.spendings}
                            size="small"
                        />
                    )}
                </div>
                <div className="balance_block__goal">
                    <div className="balance_block__goal_progress">
                        <div
                            className="balance_block__goal_progress_current"
                            style={{
                                width: `${progress > 100 ? 100 : progress}%`,
                                backgroundColor: `${progress < 100 ? '"#ffd875"' : ""}`,
                            }}
                        />
                    </div>
                    <span className="balance_block__goal_progress_percent">
                        {progress > 100 ? 100 : progress.toFixed(1)}%
                    </span>
                </div>
                <div className="balance_block__controls">
                    <div className="balance_block__switcher">
                        <span
                            className={`balance_block__switcher_period ${
                                period === "week"
                                    ? "switcher_period_selected"
                                    : ""
                            }`}
                            onClick={() => setPeriod("week")}
                        >
                            Неделя
                        </span>
                        <div className="balance_block__switcher_line" />
                        <span
                            className={`balance_block__switcher_period ${
                                period === "month"
                                    ? "switcher_period_selected"
                                    : ""
                            }`}
                            onClick={() => setPeriod("month")}
                        >
                            Месяц
                        </span>
                        <div className="balance_block__switcher_line" />
                        <span
                            className={`balance_block__switcher_period ${
                                period === "all"
                                    ? "switcher_period_selected"
                                    : ""
                            }`}
                            onClick={() => setPeriod("all")}
                        >
                            Все время
                        </span>
                    </div>
                    <img
                        className="balance_block__flag"
                        src="./icons/flag.svg"
                        onClick={() => setGoalOpened(true)}
                        alt="Установить цель"
                    />
                </div>
            </div>

            {error && <div className="balance_error">Ошибка: {error}</div>}

            <Popover
                title="Поставить цель"
                isOpen={goalOpened}
                onClose={() => setGoalOpened(false)}
            >
                <div className="balance_popover_content">
                    <input
                        className="balance_popover_content__input"
                        placeholder="Новая цель, ₽"
                        type="number"
                        value={tempGoal}
                        onChange={(e) => setTempGoal(Number(e.target.value))}
                        min="1"
                    />
                    <img
                        className="balance_popover_content__arrow"
                        src="./icons/arrow-right.svg"
                        onClick={handleSetGoal}
                        alt="Сохранить цель"
                        style={{ cursor: "pointer" }}
                    />
                </div>
            </Popover>
        </Block>
    );
}

export default Balance;
