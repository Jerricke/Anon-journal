/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unescaped-entities */
import './home.css';
import { Typewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();
    function clickHandler() {
        navigate('/about');
    }

    return (
        <div className="home">
            <div className="home__heroContainer">
                <button className="home__title" onClick={clickHandler}>
                    Anon Journal
                </button>
                <span className="home__hero">
                    <h1>
                        A place that lets you <br />
                        <Typewriter
                            words={[
                                'declutter your mind',
                                'share your thoughts and emotions',
                                'express yourself',
                                'organize your thoughts',
                                'share the canvas of your mind',
                                "relate to other's experiences",
                            ]}
                            typeSpeed={60}
                            deleteSpeed={50}
                            loop={false}
                        />
                    </h1>
                </span>
            </div>
            <div className="home__aboutContainer">
                <div>
                    <h1>About Anon Journal</h1>
                    <h3>-{'>'} Your Safe Space for Unfiltered Expression!</h3>
                    <h3>
                        -{'>'} Dive into the world of anonymous journaling,
                        where your thoughts and emotions find a voice without
                        judgment.
                    </h3>
                    <h3>
                        -{'>'} Sign up, pour your heart out, and share your
                        untold stories with our supportive community. And rest
                        assured, your identity remains confidential.
                    </h3>
                    <h3>
                        -{'>'} Write up to 1500 words! Keeping things at a good
                        length!
                    </h3>
                    <h3>
                        -{'>'} Join Anon Journal today and let the power of
                        anonymity liberate your words!
                    </h3>
                </div>
            </div>
            <div className="home__actionContainer">
                <h1>Still unsure? Just give it a try! It's totally free.99</h1>
                <button className="btn" onClick={clickHandler}>
                    Let's Go!
                </button>
            </div>
        </div>
    );
}

// Welcome to Anon Journal – Your Safe Space for Unfiltered
// Expression! Dive into the world of anonymous journaling,
// where your thoughts and emotions find a voice without
// judgment. Sign up, pour your heart out, and share your
// untold stories with our supportive community. Write up to
// 1500 words, and rest assured, your identity remains
// confidential. Join Anon Journal today and let the power of
// anonymity liberate your words!
