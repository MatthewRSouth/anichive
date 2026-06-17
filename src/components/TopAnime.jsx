import '../api/jikan.js';
import { topAnimeUrl } from '../api/jikan.js';
import { airingTopAnimeUrl } from '../api/jikan.js';
import { useFetch } from '../hooks/useFetch.js';
import { useInView } from '../hooks/useInView.js';
import AnimeCard from './AnimeCard.jsx';
export default function TopAnime({ onOpenModal }) {
    const [ref, inView] = useInView({ rootMargin: '200px' });
    const { data, loading, error } = useFetch(inView ? topAnimeUrl(12) : null, {
        debounce: 500,
    });
    const results = data?.data.slice(0, 13) ?? [];

    return (
        <div ref={ref}>
            <div>Top Anime</div>

            <div className=" container-lg grid grid-cols-6">
                {results.map((anime) => (
                    <div className="list-none flex justify-center">
                        <AnimeCard
                            anime={anime}
                            key={anime.mal_id}
                            onOpenModal={onOpenModal}
                        ></AnimeCard>
                    </div>
                ))}
            </div>
            <TopAiringAnime onOpenModal={onOpenModal}></TopAiringAnime>
        </div>
    );
}

function TopAiringAnime({ onOpenModal }) {
    const [ref, inView] = useInView({ rootMargin: '200px' });
    const {
        data: airingData,
        loading: airingLoading,
        error: airingError,
    } = useFetch(inView ? airingTopAnimeUrl(12) : null, { debounce: 1500 });
    const airingResults = airingData?.data?.slice(0, 13) ?? [];
    return (
        <div ref={ref}>
            <div>Top Airing Anime</div>
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
