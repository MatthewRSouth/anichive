import { useEffect, useState } from 'react';
import Rating from './Rating';
import '../styles/AnimeModal.css';
export default function AnimeModal({ onCloseModal, selectedAnimeId }) {
    const [animeModalError, setAnimeModalError] = useState(null);
    const [animeModalLoading, setAnimeModalLoading] = useState(false);
    const [animeModalResults, setAnimeModalResults] = useState(null);
    useEffect(
        function () {
            if (!selectedAnimeId) return;
            const controller = new AbortController();

            async function fetchAnimeById() {
                setAnimeModalError(null);

                try {
                    setAnimeModalLoading(true);
                    const res = await fetch(
                        `https://api.jikan.moe/v4/anime/${selectedAnimeId}/full`,
                        { signal: controller.signal },
                    );
                    if (!res.ok) {
                        if (res.status === 429) {
                            throw new Error(
                                'Server is busy (rate limit). Please wait a moment.',
                            );
                        }
                        throw new Error(`Jikan request failed: ${res.status}`);
                    }
                    const data = await res.json();

                    setAnimeModalResults(data.data);
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        setAnimeModalError(err);
                    }
                } finally {
                    if (!controller.signal.aborted) {
                        setAnimeModalLoading(false);
                    }
                }
            }
            fetchAnimeById();

            return function () {
                controller.abort();
            };
        },
        [selectedAnimeId],
    );
    function convertRating(rating) {
        const roundedRating = Math.ceil(rating * 10) / 10;
        return roundedRating.toFixed(1);
    }
    return (
        <div className="modal-container">
            <div className="modal-window">
                <div className="modal-close-button-container">
                    <button
                        onClick={onCloseModal}
                        className="modal-close-button"
                    >
                        CLOSE x
                    </button>
                </div>

                <div className="anime-info-container">
                    {animeModalLoading && <p>Loading...</p>}
                    {animeModalError && (
                        <p> Error: {animeModalError.message}</p>
                    )}
                    {animeModalResults && (
                        <>
                            {' '}
                            <div className="modal-anime-title-container">
                                <h1 className="modal-english-title">
                                    {animeModalResults.title_english}
                                </h1>
                                <p className="modal-romaji-title">
                                    {animeModalResults.title}
                                </p>
                                <p className="modal-japanese-title">
                                    {animeModalResults.title_japanese}
                                </p>
                            </div>
                            <div className="anime-rating-container">
                                <span className="anime-rating">
                                    {convertRating(animeModalResults.score)}
                                    <span className="anime-rating-small">
                                        /10
                                    </span>
                                </span>
                            </div>
                            <hr className="dashed-line"></hr>
                            <div className="modal-info-box">
                                <div>
                                    <img
                                        className="modal-poster"
                                        src={
                                            animeModalResults.images?.jpg
                                                ?.image_url
                                        }
                                        alt={`${animeModalResults.title}'s poster`}
                                    />
                                </div>
                                <div className="modal-middle-container">
                                    <div className="modal-rankings">
                                        <div className="modal-rankings-top">
                                            <div className="modal-rank">
                                                <span className="rank bold">
                                                    Rank
                                                </span>
                                                <br />#{animeModalResults.rank}
                                            </div>
                                            <div className="modal-popularity">
                                                <span className="popularity bold">
                                                    Popularity
                                                </span>
                                                <br />#
                                                {animeModalResults.popularity}
                                            </div>
                                        </div>
                                        <div className="modal-rankings-bottom">
                                            <div className="modal-members">
                                                <span className="members bold">
                                                    Members
                                                </span>
                                                <br />
                                                {animeModalResults.members}
                                            </div>
                                            <div className="modal-episodes">
                                                <span className="episodes bold">
                                                    Episodes
                                                </span>
                                                <br />
                                                {animeModalResults.episodes}
                                            </div>
                                        </div>
                                    </div>
                                    <Rating></Rating>

                                    <div className="modal-watch-status"></div>
                                    <div className="modal-misc-info"></div>
                                </div>
                                <div className="modal-right-container">
                                    <span>SYNOPSIS</span>
                                    <p className="modal-synopsis">
                                        {animeModalResults.synopsis}
                                    </p>
                                    <div className="modal-anime-genres">
                                        <span> GENRES/THEMES</span>
                                        <ul>
                                            {animeModalResults.genres.map(
                                                (genre) => (
                                                    <li key={genre.mal_id}>
                                                        {genre.name}
                                                    </li>
                                                ),
                                            )}
                                            {animeModalResults.themes.map(
                                                (theme) => (
                                                    <li key={theme.mal_id}>
                                                        {theme.name}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
