import './App.css';
import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';
import { useState, useEffect } from 'react';

// layout imports
import Layout from './layouts/Layout';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import Loggedin from './layouts/Loggedin';
import Home from './components/Home';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/api/check_session').then((response) => {
            if (response.ok) {
                response.json().then((user) => {
                    setUser(user);
                });
            }
        });
    }, []);

    function handleLogin(user) {
        setUser(user);
    }
    function handleLogin(user) {
        setUser(user);
    }

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />}>
                <Route index element={<Welcome />} />
                <Route
                    path="/login"
                    element={<Login onLogin={handleLogin} />}
                />
                <Route path="/signup" element={<Signup />} />
                <Route path="user" element={<Loggedin />}>
                    <Route path="home" elemen={<Home />} />
                </Route>
            </Route>
        )
    );

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
