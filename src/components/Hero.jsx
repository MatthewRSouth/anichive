import '../styles/hero.css';
import { useFetch } from '../hooks/useFetch';
import { topAnimeUrl } from '../api/jikan';
import { convertRating } from '../utils/format';
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';

export default function Hero() {
    const { data, loading, error } = useFetch(topAnimeUrl(1));
    const bestAnime = data?.data?.[0];

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error.message} />;
    if (!bestAnime) return null;

    return (
        <div className="hero-container">
            <div className="hero-poster">
                <img
                    src={bestAnime?.images?.jpg?.image_url}
                    alt={`${bestAnime?.title}'s poster`}
                    className="hero-poster-img"
                />
            </div>
            <div className="hero-info-container">
                <div className="anime-info">
                    <h1 className="anime-title">
                        {bestAnime?.title_english}
                    </h1>
                    <p className="anime-jpn-title">
                        {bestAnime?.title_japanese}
                    </p>
                    <p className="anime-synposis">
                        {bestAnime?.synopsis}
                    </p>
                </div>
                <hr />
                <div className="anime-ratings">
                    <small className="label">SCORE</small>
                    {convertRating(bestAnime?.score)}
                    <span>/10</span>
                    <small className="label">RANK</small>
                    <span>#</span>
                    {bestAnime?.rank}
                    <small className="label">YEAR</small>
                    <p>{bestAnime?.year}</p>
                    <small className="label">EPS</small>
                    <p>{bestAnime?.episodes}</p>
                </div>
                <hr />
                <div className="pills-container">
                    {bestAnime.studios.map((s) => (
                        <span key={s.mal_id ?? s.name} className="hero-pill">
                            {s.name}
                        </span>
                    ))}
                </div>
                <div className="hero-buttons-container">
                    <button>Open Dossier</button>
                    <button>Rate</button>
                </div>
            </div>
        </div>
    );
}
