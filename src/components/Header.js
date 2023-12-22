import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="header-container">
            <div className="header-logo">Culinary Compass</div>
            <nav className="header-links">
                <Link to="/" className="header-link">Home</Link>
                <Link to="/compass" className="header-link">Compass</Link>
                <Link to="/my-recipes" className="header-link">My Recipes</Link>
                <Link to="/about" className="header-link">About</Link>
            </nav>
        </div>
    );
}