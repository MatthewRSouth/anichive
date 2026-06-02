import Logo from './Logo';
import SearchBar from './SearchBar';
import Button from './Button';
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
                <Button
                    height="240px"
                    width="480px"
                    padding="large"
                    color="black"
                    borderRadius
                    onDiscoverChange={onDiscoverChange}
                    discover={discover}
                >
                    Discover
                </Button>
                <Button
                    height="24px"
                    width="48px"
                    padding="large"
                    color="black"
                    borderRadius
                    onDiscoverChange={onDiscoverChange}
                    discover={discover}
                >
                    Browse
                </Button>
            </div>
        </nav>
    );
}
