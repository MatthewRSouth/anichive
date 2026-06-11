import Logo from './Logo';
import SearchBar from './SearchBar';
import '../styles/navbar.css';
export default function Navigation({ onQueryChange, query, onViewChange, view }) {
    return (
        <nav className="navbar">
            <Logo></Logo>
            <SearchBar
                onQueryChange={onQueryChange}
                query={query}
            ></SearchBar>
            <div className="button-container">
                <button
                    className={`discover-button ${view === 'discover' ? 'active' : ''}`}
                    onClick={() => onViewChange('discover')}
                >
                    Discover
                </button>
                <button
                    className={`discover-button ${view === 'browse' ? 'active' : ''}`}
                    onClick={() => onViewChange('browse')}
                >
                    Browse
                </button>
            </div>
        </nav>
    );
}
