export default function AnimeList({ results }) {
    return (
        <ul>
            {results.map((anime) => (
                <Anime anime={anime} key={anime.mal_id}></Anime>
            ))}
        </ul>
    );
}

function Anime({ anime }) {
    return (
        <li>
            <img
                src={anime.images.jpg.small_image_url}
                alt={`${anime.title}'s poster`}
            />
            {/* // TODO: anime.title is deprecated in Jikan v4. Migrate to
            anime.titles array if/when multi-language support is added. */}
            <span>
                <strong> {anime.title}</strong>
            </span>
            <p>{anime.synopsis}</p>
        </li>
    );
}
