import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './index.css';

import { Main } from './components/Main/Main';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Search } from './components/Search/Search';

export function App() {
    return (
        <div className='app'>
            <Routes>
				<Route path="/" element={<>
                    <Header refers="/search" ref_name="Поиск" />
                    <Main/>
                </>}></Route>
                <Route path="search" element={<>
                    <Header refers="/" ref_name="Главная" />
                    <Search />
                </>}></Route>
			</Routes>
            <Footer/>
        </div>
    );
};

export default App;