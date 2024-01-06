import { useEffect } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const proceed = () => {
        navigate('/about');
    };

    return (
        <div className="body" onClick={proceed}>
            <div className="book">
                <div className="back" />
                <div className="page6">
                    <h1>Click</h1>
                    <h1>Me</h1>
                </div>
                <div className="page5" />
                <div className="page4" />
                <div className="page3" />
                <div className="page2" />
                <div className="page1" />
                <div className="front">
                    <h1>Anon</h1>
                    <h1>Journal</h1>
                </div>
            </div>
        </div>
    );
}
