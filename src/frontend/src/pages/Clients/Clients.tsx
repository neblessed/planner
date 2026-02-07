import { useEffect, useState } from "react";
import "./Clients.css";
import ClientAtom from "../../components/ClientAtom/ClientAtom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchMeetings } from "../../store/thunks/meeting.thunk";
import { groupMeetingsByClient } from "./utils/groupMeetingsByClient";

function ClientsPage() {
    const dispatch = useAppDispatch();
    const [sort, setSort] = useState("desc"); // desc - самые новые, asc - самые старые
    const [searchQuery, setSearchQuery] = useState("");
    const { meetings } = useAppSelector((store) => store.meetingsReducer);

    useEffect(() => {
        dispatch(fetchMeetings()).unwrap();
    }, [dispatch]);

    const groupedMeetings = groupMeetingsByClient(meetings);

    return (
        <div className="clients_block">
            <div className="clients_block__filters">
                <div className="clients_block__filters_base_chip">
                    {sort === "desc" ? (
                        <div
                            className="clients_block__filters_chip"
                            onClick={() => setSort("asc")}
                        >
                            <span>Дата съемки, </span>
                            <img
                                className="clients_block__filters_item"
                                src="./icons/arrow-down.svg"
                            />
                        </div>
                    ) : (
                        <div
                            className="clients_block__filters_chip"
                            onClick={() => setSort("desc")}
                        >
                            <span>Дата съемки, </span>
                            <img
                                className="clients_block__filters_item"
                                src="./icons/arrow-up.svg"
                            />
                        </div>
                    )}
                </div>
                <div className="clients_block__search_field">
                    <input
                        className="search_input"
                        id="search_input"
                        placeholder="Найти клиента"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                        style={searchQuery.length > 0 ? { width: "145px" } : {}}
                    />
                    {searchQuery.length > 0 && (
                        <img
                            className="search_cross_icon"
                            src="./icons/cross.svg"
                            onClick={() => setSearchQuery("")}
                        />
                    )}
                </div>
            </div>
            <div className="client_block__content">
                {groupedMeetings
                    .filter((flat) => {
                        const { person, telegram } = flat[0];

                        return (
                            person
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                            telegram
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                        );
                    })
                    .map((m, index) => (
                        <ClientAtom key={index} clientMeetings={m} />
                    ))}
            </div>
        </div>
    );
}

export default ClientsPage;
