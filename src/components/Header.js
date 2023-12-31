import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const [hamburgerOpen, setHamburgerOpen] = useState(false) 
    const menuRef = useRef();
    const navigate = useNavigate();

    const toggleHamburger = () => {
        setHamburgerOpen(prev => !prev);
    }

    const handleClickOutsideMenu = (event) => {
        const hamburgerIcon = document.querySelector('.hamburger-menu');
        if(hamburgerOpen && menuRef.current && !menuRef.current.contains(event.target) && !hamburgerIcon.contains(event.target)) {
            setHamburgerOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideMenu);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideMenu);
        }
    }, [hamburgerOpen])
    return (
        <div className="header-container">
            <div className="header-logo" onClick={() => navigate('/')}>Culinary Compass</div>
            <div className='hamburger-menu' onClick={toggleHamburger}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            
                <div className={`menu ${hamburgerOpen ? 'open' : ''}`} ref={menuRef}>
                    <Link to="/" className="menu-item">Home</Link>
                    <Link to="/compass" className="menu-item">Compass</Link>
                    <Link to="/my-recipes" className="menu-item">My Recipes</Link>
                    <Link to="/about" className="menu-item">About</Link>
                </div>
        </div>
    );
}