import { useState } from "react";
import Amount from "../common/Amount/Amout";
import Block from "../common/Block/Block";
import "./Balance.css";
import Popover from "../common/Popover/Popover";

type BalanceProps = {
    balance: number;
    expenses?: number;
};

/** Блок балансом */
function Balance({ balance, expenses }: BalanceProps) {
    const [period, setPeriod] = useState<"week" | "month" | "all">("week");
    const [goalOpened, setGoalOpened] = useState(false);
    //TODO Начальное значение тянуть из БД
    const [goal, setGoal] = useState(1000);

    const progress = (balance / goal) * 100;

    return (
        <Block title="Мой баланс">
            <div className="balance_block">
                <div className="balance_block__amounts">
                    {/* TODO Считать чистую сумму */}
                    <Amount amount={balance} size="large" />
                    {expenses && <Amount amount={expenses} size="small" />}
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
                        {progress > 100 ? 100 : progress}%
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
                        value={goal}
                        onChange={(e) => setGoal(Number(e.target.value))}
                    />
                    <img
                        className="balance_popover_content__arrow"
                        src="./icons/arrow-right.svg"
                        onClick={() => {
                            if (!goal || goal <= 0) {
                                const input = document.getElementsByClassName(
                                    "balance_popover_content__input"
                                );

                                input[0].classList.add("input-error");
                            } else {
                                setGoal(goal);
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
