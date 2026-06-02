import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
// import Browse from './components/Browse';
// import Button from './components/Button';
import './App.css';
import AnimeList from './components/AnimeList';
import ErrorMessage from './components/ErrorMessage';
import Loading from './components/Loading';
import Empty from './components/Empty';
import Pagination from './components/Pagination';
import AnimeModal from './components/AnimeModal';

function App() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [selectedAnimeId, setSelectedAnimeId] = useState(0);
    const [discover, setDiscover] = useState('discover');
    const PAGE_SIZE = 24;

    useEffect(
        function () {
            const controller = new AbortController();
            async function fetchAnime() {
                setError(null);
                if (query.length < 3) {
                    setResults([]);
                    setHasSearched(false);
                    setTotalPages(0);
                    return;
                }

                try {
                    setLoading(true);
                    const res = await fetch(
                        `https://api.jikan.moe/v4/anime?q=${query}&page=${currentPage}&limit=${PAGE_SIZE}`,
                        { signal: controller.signal },
                    );
                    if (!res.ok)
                        throw new Error(`Jikan request failed: ${res.status}`);
                    const data = await res.json();

                    setHasSearched(true);
                    setResults(data.data);
                    setTotalPages(data.pagination.last_visible_page);
                } catch (err) {
                    if (err.name === 'AbortError') return;
                    setError(err);
                } finally {
                    setLoading(false);
                }
            }
            const timerID = setTimeout(fetchAnime, 500);
            return function () {
                clearTimeout(timerID);
                controller.abort();
            };
        },
        [query, currentPage],
    );

    function handleDiscoverChange() {
        setDiscover('browse');
        console.log(discover);
    }

    function handleQueryChange(newQuery) {
        setQuery(newQuery);
        setCurrentPage(1);
    }

    function handlePageChange(newPage) {
        setCurrentPage(newPage);
    }

    function handleOpenModal(animeId) {
        setOpenModal(true);
        setSelectedAnimeId(animeId);
    }
    function handleCloseModal() {
        console.log('handleCloseModal called', new Error().stack);
        setOpenModal(false);
    }

    const content = loading ? (
        <Loading />
    ) : error ? (
        <ErrorMessage message={error.message} />
    ) : hasSearched && results.length === 0 && query.length >= 3 ? (
        <Empty query={query}></Empty>
    ) : results.length > 0 ? (
        <>
            <AnimeList
                results={results}
                onOpenModal={handleOpenModal}
            ></AnimeList>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                ></Pagination>
            )}
        </>
    ) : null;
    return (
        <>
            <header>
                <Navigation
                    handleQueryChange={handleQueryChange}
                    query={query}
                    discover={discover}
                    onDiscoverChange={handleDiscoverChange}
                ></Navigation>
            </header>
            <main>{content}</main>
            <footer></footer>

            {openModal && (
                <AnimeModal
                    onCloseModal={handleCloseModal}
                    selectedAnimeId={selectedAnimeId}
                    onOpenModal={handleOpenModal}
                ></AnimeModal>
            )}
        </>
    );
}

export default App;
