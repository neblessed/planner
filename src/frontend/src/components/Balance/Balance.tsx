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
    const { balance, goal } = useAppSelector((store) => store.meetingsReducer);
    const [period, setPeriod] = useState<"week" | "month" | "all">("all");
    const [goalOpened, setGoalOpened] = useState(false);
    const [tempGoal, setTempGoal] = useState(goal);
    const balanceByPeriod = getBalanceByPeriod(balance, period);
    const progress = (balance.all.total / tempGoal) * 100;

    // Синхронизируем tempGoal при изменении goal из store
    useEffect(() => {
        setTempGoal(goal);
    }, [goal]);

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
                                backgroundColor: `${
                                    progress < 100 ? '"#ffd875"' : ""
                                }`,
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
                    />
                </div>
            </div>
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
                    />
                    <img
                        className="balance_popover_content__arrow"
                        src="./icons/arrow-right.svg"
                        onClick={() => {
                            if (!tempGoal || tempGoal <= 0) {
                                const input = document.getElementsByClassName(
                                    "balance_popover_content__input",
                                );

                                input[0].classList.add("input-error");
                            } else {
                                dispatch(setupGoal(tempGoal));
                                dispatch(renewGoal(tempGoal));
                                setGoalOpened(false);
                            }
                        }}
                    />
                </div>
            </Popover>
        </Block>
    );
}

export default Balance;
