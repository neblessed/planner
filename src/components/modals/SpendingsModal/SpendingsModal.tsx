import { useAppSelector } from "../../../hooks/redux";
import Modal from "../../common/Modal/Modal";
import SpendingItem from "../../SpendingItem/SpendingItem";

type SpendingsModalProps = {
    setOpen: (state: boolean) => void;
};

function SpendingsModal({ setOpen }: SpendingsModalProps) {
    const { spendings } = useAppSelector((store) => store.meetingsReducer);

    console.log(spendings);
    const sortedSpendings = [...spendings].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <Modal title="Список трат" setOpen={setOpen}>
            {sortedSpendings.map((spending) => (
                <SpendingItem key={spending.id} spending={spending} />
            ))}
        </Modal>
    );
}

export default SpendingsModal;
