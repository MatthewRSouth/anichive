import { convertRating } from '../utils/format';

export default function AnimeCard({ anime, onOpenModal }) {
    const handleClick = () => onOpenModal(anime.mal_id);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleClick();
        }
    };
    const rating = anime.score ? convertRating(anime.score) : null;

    return (
        <li
            className="anime-item"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
        >
            <img
                src={anime.images.jpg.image_url}
                alt={`${anime.title}'s poster`}
                className="anime-item-poster"
            />
            <br />
            <div className="anime-title-container">
                <span className="anime-item-title headlines">
                    <strong>{anime.title}</strong>
                </span>
                {rating && (
                    <span className="anime-item-rating">{rating}/10</span>
                )}
            </div>
            {(anime.type || anime.year || anime.episodes) && (
                <div className="anime-item-sub-info labels">
                    {anime.type} {anime.year}{' '}
                    {anime.episodes && `${anime.episodes}EP`}
                </div>
            )}
        </li>
    );
}
