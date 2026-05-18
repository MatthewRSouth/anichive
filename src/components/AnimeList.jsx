import '../styles/animeList.css';
export default function AnimeList({ results }) {
    return (
        <ul className="anime-list-container">
            {results.map((anime) => (
                <Anime anime={anime} key={anime.mal_id}></Anime>
            ))}
        </ul>
    );
}

function Anime({ anime }) {
    const initRating = anime.score;
    const roundedRating = Math.ceil(initRating * 10) / 10;
    const rating = roundedRating.toFixed(1);

    return (
        <li className="anime-item">
            <img
                src={anime.images.jpg.image_url}
                alt={`${anime.title}'s poster`}
                className="anime-item-poster"
            />
            <br></br>
            {/* // TODO: anime.title is deprecated in Jikan v4. Migrate to
            anime.titles array if/when multi-language support is added. */}
            <span className="anime-item-title headlines">
                <strong> {anime.title}</strong> {rating}
                {'/10'}
            </span>
            <div className="anime-item-sub-info">
                {anime.type} {anime.year} {anime.episodes}EP
            </div>
        </li>
    );
}
