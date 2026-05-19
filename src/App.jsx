import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Browse from './components/Browse';
import Button from './components/Button';
import './App.css';
import AnimeList from './components/AnimeList';
import ErrorMessage from './components/ErrorMessage';
import Loading from './components/Loading';
import Empty from './components/Empty';

function App() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(
        function () {
            async function fetchAnime() {
                setError(null);
                if (query.length < 3) {
                    setResults([]);
                    setHasSearched(false);
                    return;
                }

                try {
                    setLoading(true);
                    const res = await fetch(
                        `https://api.jikan.moe/v4/anime?q=${query}`,
                    );
                    if (!res.ok)
                        throw new Error(`Jikan request failed: ${res.status}`);
                    const data = await res.json();

                    setResults(data.data);
                    setHasSearched(true);
                } catch (err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
            }
            const timerID = setTimeout(fetchAnime, 500);
            return function () {
                clearTimeout(timerID);
            };
        },
        [query],
    );

    function handleQueryChange(newQuery) {
        setQuery(newQuery);
    }
    const content = loading ? (
        <Loading />
    ) : error ? (
        <ErrorMessage message={error.message} />
    ) : hasSearched && results.length === 0 && query.length >= 3 ? (
        <Empty query={query}></Empty>
    ) : (
        <AnimeList results={results}></AnimeList>
    );
    return (
        <>
            <header>
                <Navigation
                    handleQueryChange={handleQueryChange}
                    query={query}
                ></Navigation>
            </header>
            <main>{content}</main>
            <footer></footer>
        </>
    );
}

export default App;
