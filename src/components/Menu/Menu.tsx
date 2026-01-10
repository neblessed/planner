import "./Menu.css";

type MenuProps = {
    onAddClick: (state: boolean) => void;
};

function Menu({ onAddClick }: MenuProps) {
    const formatted = new Date().toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    return (
        <div className="planner_menu">
            <div className="planner_menu__controls">
                <img
                    className="planner_menu__icon"
                    src="./icons/plus.svg"
                    onClick={() => onAddClick(true)}
                />
                <img className="planner_menu__icon" src="./icons/history.svg" />
            </div>
            <div className="planner_menu__line" />
            <span className="planner_menu__today">{formatted}</span>
        </div>
    );
}

export default Menu;
