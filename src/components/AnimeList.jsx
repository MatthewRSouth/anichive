import '../styles/animeList.css';
import AnimeCard from './AnimeCard';

export default function AnimeList({ results, onOpenModal }) {
    return (
        <ul className="anime-list-container">
            {results.map((anime) => (
                <AnimeCard
                    anime={anime}
                    key={anime.mal_id}
                    onOpenModal={onOpenModal}
                />
            ))}
        </ul>
    );
}
