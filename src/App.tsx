import { useState } from "react";
import "./App.css";
import Balance from "./components/Balance/Balance";
import Menu from "./components/Menu/Menu";
import NearestMeetingsList from "./components/NearestMeetingsList/NearestMeetingsList";
import CreationModal from "./components/modals/CreationModal/CreationModal";
import Block from "./components/common/Block/Block";

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
                <Block title="Запланировано">
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quasi asperiores possimus molestiae autem,
                        deserunt blanditiis, commodi fugit cum suscipit, eum
                        impedit voluptates labore. Fugiat, suscipit? Sint nihil
                        odio repudiandae magni.
                    </span>
                </Block>
                <Block title="Ожидают обработки">
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quasi asperiores possimus molestiae autem,
                        deserunt blanditiis, commodi fugit cum suscipit, eum
                        impedit voluptates labore. Fugiat, suscipit? Sint nihil
                        odio repudiandae magni.
                    </span>
                </Block>
                <Block title="Выполнено">
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quasi asperiores possimus molestiae autem,
                        deserunt blanditiis, commodi fugit cum suscipit, eum
                        impedit voluptates labore. Fugiat, suscipit? Sint nihil
                        odio repudiandae magni.
                    </span>
                </Block>
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
