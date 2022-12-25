import { Link } from 'react-router-dom';

import './header.css';
import logo from './icon.png';

export const Header = (params) => {
    return (
        <header className="header">
            <div className="header__block"></div>
            <div className="header__block header__logo">
                <a href="/">
                    <img src={logo} alt="logo" height="28" width="104" />
                </a>
            </div>

            <div className="header__block header__nav">
                <Link to={params.refers} className="header__link link">{params.ref_name}</Link>
            </div>
        </header>
    );
};