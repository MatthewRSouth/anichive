import { useFetch } from '../hooks/useFetch';
import { useInView } from '../hooks/useInView';
import { currentSeasonUrl } from '../api/jikan';
import AnimeCard from './AnimeCard';
export default function NowAiring({ onOpenModal }) {
    const [ref, inView] = useInView({ rootMargin: '200px' });
    const { data, loading, error } = useFetch(inView ? currentSeasonUrl() : null, {
        debounce: 500,
    });
    const airingResults = data?.data.slice(0, 18) ?? [];

    return (
        <div ref={ref}>
            <div>
                <h1>Now Airing</h1>
            </div>

            <div className=" container-lg grid grid-cols-6">
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
        </div>
    );
}
