import '../styles/searchBar.css';
export default function SearchBar({ onQueryChange, query }) {
    return (
        <div className="search-bar-container">
            <input
                value={query}
                className="query"
                type="search"
                placeholder="Search 25,000+ titles"
                onChange={(e) => onQueryChange(e.target.value)}
            />
        </div>
    );
}
