import { useEffect, useState, useRef } from 'react';

import Rating from './Rating';
import Rank from './Rank';
import '../styles/animeList.css';

import '../styles/AnimeModal.css';

export default function AnimeModal({
    onCloseModal,
    selectedAnimeId,
    onOpenModal,
}) {
    const [animeModalError, setAnimeModalError] = useState(null);
    const [animeModalLoading, setAnimeModalLoading] = useState(false);
    const [animeModalResults, setAnimeModalResults] = useState(null);

    const modalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onCloseModal();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onCloseModal]);

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
            <div className="modal-window" ref={modalRef}>
                {animeModalLoading && (
                    <p className="modal-status">Loading...</p>
                )}
                {animeModalError && (
                    <p className="modal-status">
                        Error: {animeModalError.message}
                    </p>
                )}
                {animeModalResults && (
                    <>
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
                            <div className="anime-rating-container">
                                <span className="anime-rating">
                                    {convertRating(animeModalResults.score)}
                                    <span className="anime-rating-small">
                                        /10
                                    </span>
                                </span>
                            </div>
                        </div>

                        <div className="modal-close-button-container">
                            <button
                                onClick={onCloseModal}
                                className="modal-close-button"
                            >
                                CLOSE x
                            </button>
                        </div>

                        <hr className="dashed-line" />

                        <img
                            className="modal-poster"
                            src={animeModalResults.images?.jpg?.image_url}
                            alt={`${animeModalResults.title}'s poster`}
                        />

                        <div className="modal-middle-container">
                            <Rank animeModalResults={animeModalResults} />
                            <Rating />
                            <WatchStatus />
                            <Details
                                animeModalResults={animeModalResults}
                            ></Details>
                            <div className="modal-misc-info"></div>
                        </div>

                        <div className="modal-right-container">
                            <span>SYNOPSIS</span>
                            <p className="modal-synopsis">
                                {animeModalResults.synopsis}
                            </p>
                            <div className="modal-anime-genres">
                                <span>GENRES/THEMES</span>
                                <dl className="genre-container">
                                    {animeModalResults.genres.map((genre) => (
                                        <dt
                                            className="genre"
                                            key={genre.mal_id}
                                            tone="outline"
                                        >
                                            {genre.name}
                                        </dt>
                                    ))}
                                    {animeModalResults.themes.map((theme) => (
                                        <dt
                                            className="theme"
                                            key={theme.mal_id}
                                        >
                                            {theme.name}
                                        </dt>
                                    ))}
                                </dl>
                            </div>
                        </div>

                        <section className="modal-recommended-container">
                            <hr className="dashed-line" />
                            <h2>If you liked this...</h2>
                            <Recommendations
                                selectedAnimeId={selectedAnimeId}
                                onOpenModal={onOpenModal}
                            ></Recommendations>
                        </section>
                    </>
                )}
            </div>
        </div>
    );
}

function WatchStatus() {
    const [watchStatus, setWatchStatus] = useState('');
    return (
        <div className="modal-watch-status">
            <button
                onClick={() => setWatchStatus('Watching')}
                className={
                    watchStatus === 'Watching'
                        ? 'watch-status-button selected-watch-status'
                        : 'watch-status-button'
                }
            >
                Watching
            </button>
            <button
                onClick={() => setWatchStatus('Completed')}
                className={
                    watchStatus === 'Completed'
                        ? 'watch-status-button selected-watch-status'
                        : 'watch-status-button'
                }
            >
                Completed
            </button>
            <button
                onClick={() => setWatchStatus('Plan to Watch')}
                className={
                    watchStatus === 'Plan to Watch'
                        ? 'watch-status-button selected-watch-status'
                        : 'watch-status-button'
                }
            >
                Plan to Watch
            </button>
        </div>
    );
}
function Details({ animeModalResults }) {
    return (
        <div className="details-container">
            <dl>
                <Detail
                    title="TYPE"
                    description={animeModalResults.type || '-'}
                />
                <Detail
                    title="YEAR"
                    description={animeModalResults.year || '-'}
                />
                <Detail
                    title="SEASON"
                    description={
                        animeModalResults?.season && animeModalResults?.year
                            ? `${animeModalResults.season} ${animeModalResults.year}`
                            : '-'
                    }
                />
                <Detail
                    title="DURATION"
                    description={animeModalResults.duration || '-'}
                />
                <Detail
                    title="SOURCE"
                    description={animeModalResults.source || '-'}
                />
                <Detail
                    title="RATING"
                    description={animeModalResults.rating || '-'}
                />
                <Detail
                    title="STUDIO"
                    description={
                        animeModalResults.studios
                            .map((s) => s.name)
                            .join(', ') || '—'
                    }
                />
            </dl>
        </div>
    );
}

function Detail({ title, description }) {
    return (
        <>
            <dt>{title}</dt>
            <dd>{description}</dd>
        </>
    );
}

function Recommendations({ selectedAnimeId, onOpenModal }) {
    const [recResults, setRecResults] = useState([]);
    const [modalError, setModalError] = useState(false);
    useEffect(
        function () {
            const controller = new AbortController();
            async function fetchAnime() {
                setModalError(null);

                try {
                    const res = await fetch(
                        `https://api.jikan.moe/v4/anime/${selectedAnimeId}/recommendations`,
                        { signal: controller.signal },
                    );
                    if (!res.ok)
                        throw new Error(`Jikan request failed: ${res.status}`);
                    const data = await res.json();

                    setRecResults(
                        data.data.slice(0, 6).map((item) => item.entry),
                    );
                } catch (err) {
                    if (err.name === 'AbortError') return;
                    setModalError(err);
                }
            }
            const timerID = setTimeout(fetchAnime, 500);
            return function () {
                clearTimeout(timerID);
                controller.abort();
            };
        },
        [selectedAnimeId],
    );

    return (
        <ul className="anime-list-container">
            {recResults.map((anime) => (
                <AnimeRec
                    anime={anime}
                    key={anime.mal_id}
                    onOpenModal={onOpenModal}
                />
            ))}
        </ul>
    );
}

function AnimeRec({ anime, onOpenModal }) {
    const handleClick = function () {
        onOpenModal(anime.mal_id);
    };
    const initRating = anime.score || 0;
    const roundedRating = Math.ceil(initRating * 10) / 10;
    const rating = initRating ? roundedRating.toFixed(1) : '-';

    return (
        <li className="anime-item" onClick={handleClick}>
            <img
                src={anime.images.jpg.image_url}
                alt={`${anime.title}'s poster`}
                className="anime-item-poster"
            />
            <br></br>
            {/* // TODO: anime.title is deprecated in Jikan v4. Migrate to
            anime.titles array if/when multi-language support is added. */}
            <div className="anime-title-container">
                <span className="anime-item-title headlines">
                    <strong> {anime.title}</strong>
                </span>
            </div>
        </li>
    );
}
