import { useState, useEffect } from "react";
import Balance from "../../components/Balance/Balance";
import CompletedBlock from "../../components/CompletedBlock/CompletedBlock";
import InProgressBlock from "../../components/InProgressBlock/InProgressBlock";
import Menu from "../../components/Menu/Menu";
import CreationModal from "../../components/modals/CreationModal/CreationModal";
import SpendingsModal from "../../components/modals/SpendingsModal/SpendingsModal";
import NearestMeetingsList from "../../components/NearestMeetingsList/NearestMeetingsList";
import PlannedBlock from "../../components/PlannedBlock/PlannedBlock";
import { useAppDispatch } from "../../hooks/redux";
import { fetchGoal } from "../../store/thunks/goal.thunk";
import { fetchMeetings } from "../../store/thunks/meeting.thunk";
import { fetchAllSpendings } from "../../store/thunks/spending.thunk";
import "./Home.css";

function HomePage() {
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

export default HomePage;
