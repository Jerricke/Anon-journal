import './about.css';

export default function About() {
    return (
        <div className="about">
            <h1 className="about__title">Anon Journal</h1>
            <div className="about__heroContainer">
                <h1 className="about__hero">
                    Welcome to Anon Journal – Your Safe Space for Unfiltered
                    Expression! Dive into the world of anonymous journaling,
                    where your thoughts and emotions find a voice without
                    judgment. Sign up, pour your heart out, and share your
                    untold stories with our supportive community. Write up to
                    1500 words, and rest assured, your identity remains
                    confidential. Join Anon Journal today and let the power of
                    anonymity liberate your words!
                </h1>
            </div>
            <div className="about__form">
                <h1>My name is:</h1>
                <input />
                <h1>My secret code is:</h1>
                <input />
            </div>
        </div>
    );
}
