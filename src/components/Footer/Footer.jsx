import { Link } from 'react-router-dom';
import './footer.css';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__copyright">© 2022</div>
            <nav className="footer__nav">
            <Link to="/" className="footer__link link">Главная</Link>
            <Link to="/search" className="footer__link link">Поиск</Link>
            </nav>
        </footer>
    );
};