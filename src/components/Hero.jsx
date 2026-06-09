import { useEffect, useState } from 'react';
import '../styles/hero.css';
export default function Hero() {
    const [bestAnimeResults, setBestAnimeResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(function () {
        const controller = new AbortController();
        async function fetchBestAnime() {
            setError(null);
            try {
                setLoading(true);
                const res = await fetch(
                    `https://api.jikan.moe/v4/top/anime?limit=1`,
                    { signal: controller.signal },
                );
                if (!res.ok) {
                    throw new Error(`Jikan request failed: ${res.status}`);
                }
                const data = await res.json();
                setBestAnimeResults(data.data);
            } catch (err) {
                setError(err);
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }
        fetchBestAnime();
        return function () {
            controller.abort();
        };
    }, []);

    function convertRating(rating) {
        const roundedRating = Math.ceil(rating * 10) / 10;
        return roundedRating.toFixed(1);
    }
    return (
        <div className="hero-container">
            <div className="hero-poster">
                <img
                    src={bestAnimeResults[0]?.images?.jpg?.image_url}
                    alt={`${bestAnimeResults[0]?.title}'s poster`}
                    className="hero-poster-img"
                />
            </div>
            <div className="hero-info-container">
                <div className="anime-info">
                    <h1 className="anime-title">
                        {bestAnimeResults[0]?.title_english}
                    </h1>
                    <p className="anime-jpn-title">
                        {bestAnimeResults[0]?.title_japanese}
                    </p>
                    <p className="anime-synposis">
                        {bestAnimeResults[0]?.synopsis}
                    </p>
                </div>
                <hr />
                <div className="anime-ratings">
                    <small className="label">SCORE</small>
                    {convertRating(bestAnimeResults[0]?.score)}
                    <span>/10</span>
                    <small className="label">RANK</small>
                    <span>#</span>
                    {bestAnimeResults[0]?.rank}
                    <small className="label">YEAR</small>
                    <p>{bestAnimeResults[0]?.year}</p>
                    <small className="label">EPS</small>
                    <p>{bestAnimeResults[0]?.episodes}</p>
                </div>
                <hr />
                <div className="pills-container">
                    {bestAnimeResults[0]?.studios.map((s) => (
                        <span
                            key={bestAnimeResults[0]?.mal_id}
                            className="hero-pill"
                        >
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
