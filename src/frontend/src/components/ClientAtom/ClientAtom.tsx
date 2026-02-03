import "./ClientAtom.css";
import ShortMeetingItem from "./components/ShortMeetingItem";

function ClientAtom() {
    return (
        <div className="client_block">
            <div className="client_block__personal_info">
                <span className="client_block__personal_info_name">
                    Альбина
                </span>
                <a className="client_block__personal_info_tg" href="t.me">
                    <img src="./icons/telegram.svg" />
                </a>
            </div>
            <div className="client_block__meetings_stats">
                <span className="client_block__info_label">
                    Статистика записей:
                </span>
                <span className="client_block__meetings_stats_quantity">
                    🤝 3
                </span>
                <span className="client_block__meetings_stats_feedback">
                    Нет отзыва
                </span>
                <span className="client_block__meetings_stats_comment"></span>
            </div>
            <span className="client_block__info_label">Последние записи:</span>
            <div className="client_block__meetings_block">
                <ShortMeetingItem
                    date="02.02.2026"
                    amount="3500"
                    status="Сдано"
                />
            </div>
        </div>
    );
}

export default ClientAtom;
