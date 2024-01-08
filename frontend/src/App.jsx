import './App.css';
import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';

// layout imports
import Layout from './layouts/Layout';
import Home from './components/Home';
import About from './components/About';

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
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