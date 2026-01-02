import "./App.css";

import Block from "./components/common/Block/Block";
import MeetingItem from "./components/MeetingItem/MeetingItem";

function App() {
    return (
        <>
            <div className="app_row1">
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
                </Block>
            </div>
        </>
    );
}

export default App;
