import Logo from './Logo';
import SearchBar from './SearchBar';
import '../styles/navbar.css';
export default function Navigation({
    handleQueryChange,
    query,
    onDiscoverChange,
    discover,
}) {
    return (
        <nav className="navbar">
            <Logo></Logo>
            <SearchBar
                onQueryChange={handleQueryChange}
                query={query}
            ></SearchBar>
            <div className="button-container">
                {' '}
                <button
                    className={`discover-button ${discover === 'discover' ? 'active' : ''}`}
                    onClick={() => onDiscoverChange('discover')}
                >
                    Discover
                </button>
                <button
                    className={`discover-button ${discover === 'browse' ? 'active' : ''}`}
                    onClick={() => onDiscoverChange('browse')}
                >
                    Browse
                </button>
            </div>
        </nav>
    );
}
