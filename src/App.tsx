import "./App.css";
import Block from "./components/common/Block/Block";
import MeetingItem from "./components/MeetingItem/MeetingItem";

function App() {
    return (
        <>
            <Block title="Ближайшие встречи">
                <MeetingItem
                    person="Vadim T."
                    date={new Date()}
                    links={{ telegram: "https://t.me/neblessed" }}
                />
                <MeetingItem
                    person="Julia K."
                    date={new Date()}
                    links={{ telegram: "https://t.me/neblessed" }}
                />
                <MeetingItem
                    person="Arnold S."
                    date={new Date()}
                    links={{ telegram: "https://t.me/neblessed" }}
                />
                <MeetingItem
                    person="Tom K."
                    date={new Date()}
                    links={{ telegram: "https://t.me/neblessed" }}
                />
                {/* <p>Ильзира Сильверстайн – 18:00</p>
                <p>Вадим Токаев – 22:00</p>
                <p>Ещё кто-то – 08:00</p>
                <button>Continue</button> */}
            </Block>
        </>
    );
}

export default App;
