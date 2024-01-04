// import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="layout">
            <header>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="page1">Page1</NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
