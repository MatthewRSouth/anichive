import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Browse from './components/Browse';
import Button from './components/Button';
import './App.css';
import AnimeList from './components/AnimeList';

function App() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(
        function () {
            async function fetchAnime() {
                if (query.length < 3) {
                    setResults([]);
                    return;
                }
                const res = await fetch(
                    `https://api.jikan.moe/v4/anime?q=${query}`,
                );
                const data = await res.json();
                console.log(data.data);
                setResults(data.data);
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
    return (
        <div>
            <Navigation
                handleQueryChange={handleQueryChange}
                query={query}
            ></Navigation>
            <AnimeList results={results}></AnimeList>
        </div>
    );
}

export default App;
