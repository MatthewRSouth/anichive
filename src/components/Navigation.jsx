import Logo from './Logo';
import SearchBar from './SearchBar';
import Button from './Button';
import '../styles/navbar.css';
import '../styles/';
export default function Navigation({ handleQueryChange, query }) {
    return (
        <nav className="navbar">
            <Logo></Logo>
            <SearchBar
                onQueryChange={handleQueryChange}
                query={query}
            ></SearchBar>
            <div className="button-container">
                {' '}
                <Button height="24px" width="48px" padding="large">
                    Discover
                </Button>
                <Button height="24px" width="48px" padding="large">
                    Browse
                </Button>
            </div>
        </nav>
    );
}
