import { useEffect, useState } from "react";
import "./App.css";
import Balance from "./src/components/Balance/Balance";
import Menu from "./src/components/Menu/Menu";
import NearestMeetingsList from "./src/components/NearestMeetingsList/NearestMeetingsList";
import CreationModal from "./src/components/modals/CreationModal/CreationModal";
import PlannedBlock from "./src/components/PlannedBlock/PlannedBlock";
import InProgressBlock from "./src/components/InProgressBlock/InProgressBlock";
import CompletedBlock from "./src/components/CompletedBlock/CompletedBlock";
import SpendingsModal from "./src/components/modals/SpendingsModal/SpendingsModal";
import { useAppDispatch } from "./src/hooks/redux";
import { fetchAllSpendings } from "./src/store/thunks/spending.thunk";
import { fetchMeetings } from "./src/store/thunks/meeting.thunk";
import { fetchGoal } from "./src/store/thunks/goal.thunk";

function App() {
    const dispatch = useAppDispatch();
    const [creationModalVisible, setCreationModalVisible] = useState(false);
    const [spendingsModalVisible, setSpendingsModalVisible] = useState(false);

    useEffect(() => {
        dispatch(fetchAllSpendings()).unwrap();
        dispatch(fetchMeetings()).unwrap();
        dispatch(fetchGoal()).unwrap();
    }, [dispatch]);

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
                <Menu
                    onAddClick={setCreationModalVisible}
                    onSpendingsClick={setSpendingsModalVisible}
                />
            </div>

            {creationModalVisible && (
                <CreationModal setOpen={setCreationModalVisible} />
            )}

            {spendingsModalVisible && (
                <SpendingsModal setOpen={setSpendingsModalVisible} />
            )}
        </div>
    );
}

export default App;
