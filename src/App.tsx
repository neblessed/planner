import { useState } from "react";
import "./App.css";
import Balance from "./components/Balance/Balance";
import Menu from "./components/Menu/Menu";
import NearestMeetingsList from "./components/NearestMeetingsList/NearestMeetingsList";
import CreationModal from "./components/modals/CreationModal/CreationModal";
import PlannedBlock from "./components/PlannedBlock/PlannedBlock";
import InProgressBlock from "./components/InProgressBlock/InProgressBlock";
import CompletedBlock from "./components/CompletedBlock/CompletedBlock";

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
            <div className="widgets_row__3">
                <PlannedBlock />
                <InProgressBlock />
                <CompletedBlock />
            </div>
            <div className="menu_row">
                <Menu onAddClick={setCreationModalVisible} />
            </div>

            {creationModalVisible && (
                <CreationModal setOpen={setCreationModalVisible} />
            )}
        </div>
    );
}

export default App;
