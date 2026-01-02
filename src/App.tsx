import "./App.css";
import Block from "./components/common/Block/Block";

function App() {
    return (
        <>
            <Block title="Ближайшие встречи">
                <p>Ильзира Сильверстайн – 18:00</p>
                <p>Вадим Токаев – 22:00</p>
                <p>Ещё кто-то – 08:00</p>
                <button>Continue</button>
            </Block>
        </>
    );
}

export default App;
