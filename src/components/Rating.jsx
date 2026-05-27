import '../styles/AnimeModal.css';
import { useState } from 'react';
export default function Rating() {
    const [rating, setRating] = useState(1);
    const [tempRating, setTempRating] = useState(0);

    function handleRating(rating) {
        setRating(rating);
    }
    return (
        <div className="modal-personal-score-container">
            <div className="modal-personal-score-content">
                <div className="score">
                    <p>Your Score</p>
                    <span className="score-10">
                        <strong>{tempRating || rating || '-'}/10</strong>
                    </span>
                </div>
                <ul className="numbers" role="button">
                    {Array.from({ length: 10 }, (_, index) => (
                        <Number
                            key={index}
                            onRate={() => handleRating(index + 1)}
                            full={
                                tempRating
                                    ? tempRating >= index + 1
                                    : rating >= index + 1
                            }
                            onHoverIn={() => setTempRating(index + 1)}
                            onHoverOut={() => setTempRating(0)}
                        >
                            {index + 1}
                        </Number>
                    ))}
                </ul>

                <div className="rating-explanation-container">
                    <p className="rating-explanation">TRASH</p>
                    <p className="rating-explanation">OK</p>
                    <p className="rating-explanation">GOOD</p>
                    <p className="rating-explanation">PEAK</p>
                </div>
            </div>
        </div>
    );
}
function Number({ children, onRate, full, onHoverIn, onHoverOut }) {
    return (
        <button
            className={
                full ? 'score-buttons score-buttons-full' : 'score-buttons'
            }
            onClick={onRate}
            onMouseEnter={onHoverIn}
            onMouseLeave={onHoverOut}
        >
            {children}
        </button>
    );
}
