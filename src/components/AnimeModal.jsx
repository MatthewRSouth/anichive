import '../styles/AnimeModal.css';
export default function AnimeModal({ onCloseModal }) {
    return (
        <div className="modal-container">
            <div className="modal-window">
                <button onClick={onCloseModal} className="modal-close-button">
                    X
                </button>
            </div>
        </div>
    );
}
