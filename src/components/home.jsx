import "./css/Home.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Home() {

    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: true
        });
    }, []);

    return (
        <div className="home">

            {/* HERO SECTION */}
            <section className="hero">
                <div className="overlay">
                    <h1>Cricket-Pulse</h1>
                    <p>Predict IPL Matches. Compete Globally. Dominate the Game.</p>

                    <div className="hero-buttons">
                        <button className="primary-btn"><Link to="/matches">Start Predicting</Link></button>
                        <button className="secondary-btn"><Link to="/leaderboard">View Leaderboard</Link></button>
                    </div>
                </div>
            </section>


            {/* ABOUT */}
            <section className="about" data-aos="fade-up">
                <div className="batsman">
                    <img src="./player.png" alt="" />
                </div>
                <div className="abt glass">
                    <h2>What is CricketPulse?</h2>
                    <p>
                        CricketPulse AI is a smart platform where users can predict IPL match winners,
                        compete with others globally, earn points, and climb the <b><Link to="/leaderboard">LeaderBoard</Link></b>
                        Powered by AI, it gives you insights, suggestions, and recommendations.
                    </p>
                </div>
            </section>


            {/* HOW IT WORKS */}
            <section className="how" data-aos="fade-up">
                <h2>How It Works</h2>

                <div className="how-grid glass">

                    <div className="step">
                        <h3><img src="./one.gif" alt="" /> Predict Matches</h3>
                        <ul>
                            <li>Select the winning team before the match starts</li>
                            <li>View match details, form, and stats</li>
                            <li>Make smart predictions using insights</li>
                        </ul>
                    </div>

                    <div className="step">
                        <h3><img src="./two.gif" alt="" /> Earn Points</h3>
                        <ul>
                            <li>Gain points for every correct prediction</li>
                            <li>Bonus points for streaks</li>
                            <li>Accuracy improves your ranking</li>
                        </ul>
                    </div>

                    <div className="step">
                        <h3><img src="./three.gif" alt="" /> Climb Leaderboard</h3>
                        <ul>
                            <li>Compete with users worldwide</li>
                            <li>See your rank in real-time</li>
                            <li>Become the top cricket predictor</li>
                        </ul>
                    </div>

                    <div className="step">
                        <h3><img src="./four.gif" alt="" />Share Your Rank</h3>
                        <ul>
                            <li>Share leaderboard position on Social Media</li>
                            <li>Challenge friends and compare scores</li>
                            <li>Build your cricket reputation</li>
                        </ul>
                    </div>

                </div>
            </section>


            {/* FEATURES */}
            <section className="features glass" data-aos="zoom-in">
                <h2>Features</h2>

                <div className="features-grid">
                    <div className="card">AI Match Predictions</div>
                    <div className="card">Player & Team Stats</div>
                    <div className="card">Global Leaderboard</div>
                    <div className="card">Social Media</div>
                    <div className="card">Live Voting System</div>
                    <div className="card">Real-Time Updates</div>
                </div>
            </section>


            {/* AI SECTION */}
            <section className="ai" data-aos="fade-right">
                <div className="robot">
                    <div className="ai-box glass">
                        <h2>CricketPulse AI</h2>
                        <p>
                            Ask anything about cricket — match predictions, player performance,
                            fantasy picks, and much more.
                        </p>

                        <div className="ai-box">
                            <input placeholder="Ask AI (e.g. Who will win today?)" />
                            <button><Link to="/ai-stats">AI Stats</Link></button>
                        </div>
                    </div>
                    <img src="https://cdn.dribbble.com/userupload/7306883/file/still-a236a452cd3afdeaa76d2e1958a646d4.gif?resize=1200x900&vertical=center" alt="" />
                </div>
            </section>


            {/* LEADERBOARD PREVIEW */}
            <section className="leaderboard" data-aos="fade-left">
                <div className="leader glass">
                    <h2>Top Predictors (eg)</h2>

                    <div className="leaderboard-list">
                        <div>🥇 RohitFan99 - 1200 pts</div>
                        <div>🥈 KingKohli - 1100 pts</div>
                        <div>🥉 CricketGuru - 980 pts</div>
                    </div>
                </div>
            </section>


            {/* CTA */}
            <section className="cta" data-aos="zoom-in-up">
                <div className="predict">
                    <img src="./predict.webp" alt="" />
                    <div className="join ">
                        <h2>Ready to Prove Your Cricket Knowledge?</h2>
                        <button className="primary-btn"><Link>Join Now</Link> </button>
                    </div>
                </div>
            </section>


            <footer className="footer">

                <div className="footer-container">

                    {/* BRAND */}
                    <div className="footer-section">
                        <h2>CricketPulse AI</h2>
                        <p>
                            Predict IPL matches, compete globally, and become the ultimate cricket expert.
                        </p>
                    </div>

                    {/* FEATURES */}
                    <div className="footer-section">
                        <h3>Features</h3>
                        <ul>
                            <li>Match Predictions</li>
                            <li><Link to="/leaderboard">Leaderboard</Link></li>
                            <li><Link to="/my-predictions">My Predictions</Link></li>
                            <li><Link to="/ai-stats">AI Stats</Link></li>
                        </ul>
                    </div>

                    {/* EXPLORE */}
                    <div className="footer-section">
                        <h3>Explore</h3>
                        <ul>
                            <li><Link to="/teams">Teams</Link></li>
                            <li><Link to="/matches">Matches</Link></li>
                            <li><Link to="/stats">Stats</Link></li>
                            <li><Link to="/leaderboard">Leaderboard</Link></li>
                        </ul>
                    </div>

                    {/* ACCOUNT */}
                    <div className="footer-section">
                        <h3>Your Account</h3>
                        <ul>
                            <li>Profile</li>
                            <li>My Predictions</li>
                            <li>Leaderboard Rank</li>
                            <li>Settings</li>
                        </ul>
                    </div>

                </div>

                {/* BOTTOM */}
                <div className="footer-bottom">
                    <p>© 2026 CricketPulse AI. All rights reserved.</p>
                </div>

            </footer>

        </div>


    );
}