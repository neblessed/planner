import "./App.css";
import Balance from "./components/Balance/Balance";
import NearestMeetingsList from "./components/NearestMeetingsList/NearestMeetingsList";

function App() {
    return (
        <>
            <div className="app_row1">
                <NearestMeetingsList />
                <Balance />
            </div>
        </>
    );
}

export default App;
