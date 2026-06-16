import { useState } from 'react';
import Navigation from './components/Navigation';
import './App.css';
import AnimeList from './components/AnimeList';
import ErrorMessage from './components/ErrorMessage';
import Loading from './components/Loading';
import Empty from './components/Empty';
import Pagination from './components/Pagination';
import AnimeModal from './components/AnimeModal';
import Hero from './components/Hero';
import NowAiring from './components/NowAiring';
import { useFetch } from './hooks/useFetch';
import { searchAnimeUrl } from './api/jikan';

function App() {
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedAnimeId, setSelectedAnimeId] = useState(null);
    const [view, setView] = useState('discover');

    const PAGE_SIZE = 24;

    const searchUrl =
        query.length >= 3
            ? searchAnimeUrl(query, currentPage, PAGE_SIZE)
            : null;
    const {
        data: searchData,
        loading,
        error,
    } = useFetch(searchUrl, { debounce: 500 });

    const results = searchData?.data ?? [];
    const totalPages = searchData?.pagination?.last_visible_page ?? 0;
    const hasSearched = searchData !== null;

    function handleViewChange(newView) {
        setView(newView);
        setQuery('');
    }

    function handleQueryChange(newQuery) {
        setQuery(newQuery);
        setCurrentPage(1);
        setView('browse');
    }

    function handlePageChange(newPage) {
        setCurrentPage(newPage);
    }

    function handleOpenModal(animeId) {
        setSelectedAnimeId(animeId);
    }
    function handleCloseModal() {
        setSelectedAnimeId(null);
    }

    return (
        <>
            <header>
                <Navigation
                    onQueryChange={handleQueryChange}
                    query={query}
                    view={view}
                    onViewChange={handleViewChange}
                ></Navigation>
            </header>
            <main>
                {view === 'discover' ? (
                    <DiscoverView></DiscoverView>
                ) : (
                    <BrowseView
                        loading={loading}
                        error={error}
                        hasSearched={hasSearched}
                        results={results}
                        query={query}
                        handleOpenModal={handleOpenModal}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                    ></BrowseView>
                )}
            </main>
            <footer></footer>

            {selectedAnimeId !== null && (
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

function DiscoverView({ handleOpenModal }) {
    return (
        <div>
            <Hero></Hero>
            <NowAiring onOpenModal={handleOpenModal}></NowAiring>
        </div>
    );
}
function BrowseView({
    loading,
    error,
    hasSearched,
    results,
    query,
    handleOpenModal,
    totalPages,
    currentPage,
    handlePageChange,
}) {
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

    return <div>{content}</div>;
}
