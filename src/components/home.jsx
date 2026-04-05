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
                        <img src="./one.gif" alt="" />
                        <h3>Predict Matches</h3>
                        <ul>
                            <li>Select the winning team before the match starts</li>
                            <li>View match details, form, and stats</li>
                            <li>Make smart predictions using insights</li>
                        </ul>
                    </div>

                    <div className="step">
                        <img src="./two.gif" alt="" />
                        <h3>Earn Points</h3>
                        <ul>
                            <li>Gain points for every correct prediction</li>
                            <li>Bonus points for streaks</li>
                            <li>Accuracy improves your ranking</li>
                        </ul>
                    </div>

                    <div className="step">
                        <img src="./three.gif" alt="" />
                        <h3>Climb Leaderboard</h3>
                        <ul>
                            <li>Compete with users worldwide</li>
                            <li>See your rank in real-time</li>
                            <li>Become the top cricket predictor</li>
                        </ul>
                    </div>

                    <div className="step">
                        <img src="./four.gif" alt="" />
                        <h3>Share Your Rank</h3>
                        <ul>
                            <li>Share leaderboard position on Social Media</li>
                            <li>Challenge friends and compare scores</li>
                            <li>Build your cricket reputation</li>
                        </ul>
                    </div>

                </div>
            </section>


            <section className="features-section" data-aos="zoom-in">
                <h2 className="features-title">Why CricketPulse?</h2>

                <div className="features-grid">

                    <div className="feature-card">
                        <span className="feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.4 15a7.97 7.97 0 0 0 .6-3 7.97 7.97 0 0 0-.6-3" />
                                <path d="M4.6 15A7.97 7.97 0 0 1 4 12c0-1.04.2-2.04.6-3" />
                                <path d="M15 19.4c-1 .4-2 .6-3 .6s-2-.2-3-.6" />
                                <path d="M15 4.6c-1-.4-2-.6-3-.6s-2 .2-3 .6" />
                            </svg>
                        </span>
                        <h3>AI Predictions</h3>
                        <p>Smart insights powered by AI to improve your match predictions.</p>
                    </div>

                    <div className="feature-card">
                        <span className="feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
                                <line x1="4" y1="20" x2="4" y2="10" />
                                <line x1="10" y1="20" x2="10" y2="4" />
                                <line x1="16" y1="20" x2="16" y2="14" />
                                <line x1="22" y1="20" x2="22" y2="8" />
                            </svg>
                        </span>
                        <h3>Stats & Analytics</h3>
                        <p>Deep player and team stats to make informed decisions.</p>
                    </div>

                    <div className="feature-card highlight">
                        <span className="feature-icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
                            <path d="M8 21h8" />
                            <path d="M12 17v4" />
                            <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
                            <path d="M5 4h2v3a2 2 0 0 1-2 2H4V5a1 1 0 0 1 1-1z" />
                            <path d="M19 4h-2v3a2 2 0 0 0 2 2h1V5a1 1 0 0 0-1-1z" />
                        </svg></span>
                        <h3>Leaderboard</h3>
                        <p>Compete globally and climb rankings with every prediction.</p>
                    </div>

                    <div className="feature-card">
                        <span className="feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
                                <path d="M12 2s4 4 4 8a4 4 0 1 1-8 0c0-4 4-8 4-8z" />
                                <path d="M12 14a2 2 0 1 1-4 0c0-2 2-4 2-4s2 2 2 4z" />
                            </svg>
                        </span>
                        <h3>Live Voting</h3>
                        <p>See what others predict and vote in real-time.</p>
                    </div>

                    <div className="feature-card">
                        <span className="feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                        </span>
                        <h3>Real-Time Updates</h3>
                        <p>Instant match updates and prediction results.</p>
                    </div>

                    <div className="feature-card">
                        <span className="feature-icon">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M2 12h20" />
                                <path d="M12 2a15 15 0 0 1 0 20" />
                                <path d="M12 2a15 15 0 0 0 0 20" />
                            </svg>
                        </span>
                        <h3>Global Community</h3>
                        <p>Challenge players worldwide and prove your cricket IQ.</p>
                    </div>

                </div>
            </section>


            {/* AI SECTION */}
            <section className="ai-section" data-aos="fade-up">
                <div className="ai-container">

                    {/* LEFT CONTENT */}
                    <div className="ai-content">
                        <span className="ai-badge"> Powered by AI</span>

                        <h2 className="ai-title">
                            Smart Predictions with CricketPulse AI
                        </h2>

                        <p className="ai-description">
                            Get match predictions, player insights, and winning strategies powered by intelligent analytics.
                        </p>

                        <div className="ai-input-box">
                            <input
                                placeholder="Ask AI (e.g. Who will win today?)"
                            />
                            <Link to="/ai-stats" className="ai-btn">
                                Ask AI
                            </Link>
                        </div>

                        {/* MINI FEATURES */}
                        <div className="ai-features">

                            <div className="ai-feature-item">
                                <span className="ai-icon">
                                    {/* ⚡ Thunder */}
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                    </svg>
                                </span>
                                <p>Instant Answers</p>
                            </div>

                            <div className="ai-feature-item">
                                <span className="ai-icon">
                                    {/* 📊 Stats */}
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="4" y1="20" x2="4" y2="10" />
                                        <line x1="10" y1="20" x2="10" y2="4" />
                                        <line x1="16" y1="20" x2="16" y2="14" />
                                        <line x1="22" y1="20" x2="22" y2="8" />
                                    </svg>
                                </span>
                                <p>Data Driven</p>
                            </div>

                            <div className="ai-feature-item">
                                <span className="ai-icon">
                                    {/* 🎯 Target */}
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <circle cx="12" cy="12" r="6" />
                                        <circle cx="12" cy="12" r="2" />
                                    </svg>
                                </span>
                                <p>Better Predictions</p>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="ai-image">
                        <img src="./ball.png" alt="AI" className="rotating-image" />
                    </div>

                </div>
            </section>


            {/* LEADERBOARD PREVIEW */}
            <section className="leaderboard-section" data-aos="fade-left">
                <h2 className="leaderboard-title">Top Predictors (eg)</h2>

                <div className="leaderboard-container">

                    {/* 🥇 FIRST */}
                    <div className="leader-card first">
                        <div className="leader-rank">1</div>
                        <h3>RohitFan99</h3>
                        <p>1200 pts</p>
                    </div>

                    {/* 🥈 SECOND */}
                    <div className="leader-card second">
                        <div className="leader-rank">2</div>
                        <h3>KingKohli</h3>
                        <p>1100 pts</p>
                    </div>

                    {/* 🥉 THIRD */}
                    <div className="leader-card third">
                        <div className="leader-rank">3</div>
                        <h3>CricketGuru</h3>
                        <p>980 pts</p>
                    </div>

                </div>
            </section>


            {/* CTA */}
            <section className="cta-section" data-aos="zoom-in-up">
                <div className="cta-container">

                    {/* LEFT IMAGE */}
                    <div className="cta-image">
                        <svg viewBox="0 0 64 64" fill="none">
                            <circle cx="32" cy="18" r="8" fill="#111827" />
                            <rect x="24" y="26" width="16" height="20" rx="4" fill="#22C55E" />
                            <line x1="24" y1="30" x2="12" y2="40" stroke="#111827" strokeWidth="3" />
                            <line x1="40" y1="30" x2="52" y2="40" stroke="#111827" strokeWidth="3" />
                            <line x1="52" y1="40" x2="52" y2="20" stroke="#111827" strokeWidth="3" />
                            <line x1="28" y1="46" x2="24" y2="60" stroke="#111827" strokeWidth="3" />
                            <line x1="36" y1="46" x2="40" y2="60" stroke="#111827" strokeWidth="3" />
                        </svg>
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="cta-content">
                        <span className="cta-badge">Join the Game</span>

                        <h2 className="cta-title">
                            Ready to Prove Your Cricket Knowledge?
                        </h2>

                        <p className="cta-text">
                            Predict matches, earn points, and rise to the top of the leaderboard.
                        </p>

                        <Link to="/register" className="cta-button">
                            Start Predicting →
                        </Link>
                    </div>

                </div>
            </section>

            <footer className="footer">

                <div className="footer-container">

                    {/* BRAND */}
                    <div className="footer-brand">
                        <h2>CricketPulse AI</h2>
                        <p>
                            Predict IPL matches, compete globally, and become the ultimate cricket expert.
                        </p>

                        {/* SOCIALS */}
                        <div className="footer-socials">

                            {/* 🌐 Website / Globe */}
                            <a href="#">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M2 12h20" />
                                    <path d="M12 2a15 15 0 0 1 0 20" />
                                    <path d="M12 2a15 15 0 0 0 0 20" />
                                </svg>
                            </a>

                            {/* 🐦 Twitter */}
                            <a href="#">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22 5.92c-.77.35-1.6.59-2.46.7a4.3 4.3 0 0 0 1.88-2.37
                                8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.3 3.9
                                12.14 12.14 0 0 1-8.82-4.47 4.28 4.28 0 0 0 1.32 5.71
                                4.23 4.23 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2
                                4.29 4.29 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.97
                                8.6 8.6 0 0 1-5.33 1.84c-.35 0-.7-.02-1.04-.06
                                A12.13 12.13 0 0 0 8.29 21c7.55 0 11.68-6.26
                                11.68-11.68l-.01-.53A8.34 8.34 0 0 0 22 5.92z"/>
                                </svg>
                            </a>

                            {/* 📸 Instagram */}
                            <a href="#">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17" cy="7" r="1" />
                                </svg>
                            </a>

                        </div>
                    </div>

                    {/* LINKS */}
                    <div className="footer-links">
                        <h3>Features</h3>
                        <Link to="/leaderboard">Leaderboard</Link>
                        <Link to="/my-predictions">My Predictions</Link>
                        <Link to="/ai-stats">AI Stats</Link>
                    </div>

                    <div className="footer-links">
                        <h3>Explore</h3>
                        <Link to="/teams">Teams</Link>
                        <Link to="/matches">Matches</Link>
                        <Link to="/stats">Stats</Link>
                    </div>

                    <div className="footer-links">
                        <h3>Account</h3>
                        <span>Profile</span>
                        <span>Settings</span>
                        <span>Leaderboard Rank</span>
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