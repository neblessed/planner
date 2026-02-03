import { useState } from "react";
import "./Clients.css";
import ClientAtom from "../../components/ClientAtom/ClientAtom";

function ClientsPage() {
    const [sort, setSort] = useState("desc"); // desc - самые новые, asc - самые старые
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="clients_block">
            <div className="clients_block__filters">
                <div className="clients_block__filters_sort_by_date">
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
                <ClientAtom />
            </div>
        </div>
    );
}

export default ClientsPage;
