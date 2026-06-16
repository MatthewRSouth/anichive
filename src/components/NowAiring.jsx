import { useFetch } from '../hooks/useFetch';
import { currentSeasonUrl } from '../api/jikan';
import AnimeCard from './AnimeCard';
export default function NowAiring({ onOpenModal }) {
    const { data, loading, error } = useFetch(currentSeasonUrl(), {
        debounce: 500,
    });
    const airingResults = data?.data.slice(0, 10) ?? [];

    return (
        <>
            <div>
                <h1>Now Airing</h1>
            </div>

            <div className=" container-lg grid grid-cols-5">
                {airingResults.map((anime) => (
                    <div className="list-none flex justify-center">
                        <AnimeCard
                            anime={anime}
                            key={anime.mal_id}
                            onOpenModal={onOpenModal}
                        ></AnimeCard>
                    </div>
                ))}
            </div>
        </>
    );
}
