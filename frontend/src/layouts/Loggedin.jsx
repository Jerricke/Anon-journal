// import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './layout.css';

export default function Loggedin() {
    return (
        <div className="layout">
            <header>
                <nav />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
