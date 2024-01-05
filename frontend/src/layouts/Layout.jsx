// import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
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
