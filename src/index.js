import React from 'react';
import ReactDOM from 'react-dom/client';
import './static/index.css';
import Wordle from './pages/Wordle';
import Layout from './pages/Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="wordle-clone" element={<Wordle />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);