import "./ClientAtom.css";
import ShortMeetingItem from "./components/ShortMeetingItem";

function ClientAtom() {
    return (
        <div className="client">
            <img className="client_avatar" src="./icons/person.svg" />
            <div className="client_info">
                <span className="client_name">Вадим</span>
                <div className="client_stats">
                    <span className="client_stat">🤝 3</span>
                    <span className="client_stat">Без отзыва</span>
                </div>
            </div>
            <div className="client_recent_meetings">
                <ShortMeetingItem
                    date="02.02.2026"
                    amount="3500"
                    status="Сдано"
                />
                <ShortMeetingItem
                    date="02.06.2026"
                    amount="7500"
                    status="Сдано"
                />
                <ShortMeetingItem
                    date="01.17.2026"
                    amount="3500"
                    status="Сдано"
                />
                <ShortMeetingItem
                    date="01.17.2026"
                    amount="3500"
                    status="Сдано"
                />
                <ShortMeetingItem
                    date="01.17.2026"
                    amount="3500"
                    status="Сдано"
                />
            </div>
        </div>
    );
}

export default ClientAtom;
