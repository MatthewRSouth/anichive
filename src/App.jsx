import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Browse from './components/Browse';
import Button from './components/Button';
import './App.css';
import { searchAnime } from './api/jikan';

function App() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleQueryChange(query) {
        setQuery(query);
    }
    return (
        <div>
            <Navigation
                handleQueryChange={handleQueryChange}
                query={query}
            ></Navigation>
            <p>{query}</p>
        </div>
    );
}

export default App;
