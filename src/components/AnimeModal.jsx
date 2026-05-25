import { useEffect, useState } from 'react';
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
    return (
        <div className="modal-container">
            <div className="modal-window">
                <button onClick={onCloseModal} className="modal-close-button">
                    X
                </button>
                <div className="anime-info-container">
                    {animeModalLoading && <p>Loading...</p>}
                    {animeModalError && (
                        <p> Error: {animeModalError.message}</p>
                    )}
                    {animeModalResults && (
                        <div className="modal-info-box">
                            <div className="modal-poster">
                                <img
                                    src={
                                        animeModalResults.images?.jpg?.image_url
                                    }
                                    alt={`${animeModalResults.title}'s poster`}
                                />
                            </div>
                            <div className="modal-middle-container">
                                <div className="modal-rankings"></div>
                                <div className="modal-personal-score"></div>
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
                    )}
                </div>
            </div>
        </div>
    );
}
