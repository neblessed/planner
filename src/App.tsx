import { useState } from "react";
import "./App.css";
import Balance from "./components/Balance/Balance";
import Menu from "./components/Menu/Menu";
import NearestMeetingsList from "./components/NearestMeetingsList/NearestMeetingsList";
import CreationModal from "./components/modals/CreationModal/CreationModal";

function App() {
    const [creationModalVisible, setCreationModalVisible] = useState(false);

    return (
        <div className="planner">
            <div className="widgets_row__1">
                <NearestMeetingsList />
            </div>
            <div className="widgets_row__2">
                <Balance />
            </div>
            <div className="menu_row">
                <Menu onAddClick={setCreationModalVisible} />
            </div>

            {creationModalVisible && (
                <CreationModal setClose={setCreationModalVisible} />
            )}
        </div>
    );
}

export default App;
