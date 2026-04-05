import { useEffect, useState } from "react";
import PredictButton from "./PredictButton";
import "./css/MatchList.css";
import { toast } from "react-toastify";

function MatchList() {
    const [filter, setFilter] = useState("all");
    const [matches, setMatches] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [predictions, setPredictions] = useState([]);
    const [alertedMatches, setAlertedMatches] = useState({});

    const isPredictionClosed = (matchDate) => {
        const matchTime = new Date(matchDate);
        return currentTime >= matchTime;
    };

    const isToday = (matchDate) => {
        const today = new Date();
        const match = new Date(matchDate);

        return (
            today.getDate() === match.getDate() &&
            today.getMonth() === match.getMonth() &&
            today.getFullYear() === match.getFullYear()
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "2-digit"
        });
    };

    const teamLogos = {
        "Royal Challengers Bengaluru": "teams/rcb.avif",
        "Sunrisers Hyderabad": "teams/srh.avif",
        "Mumbai Indians": "teams/mi.avif",
        "Chennai Super Kings": "teams/csk.avif",
        "Kolkata Knight Riders": "teams/kkr.avif",
        "Delhi Capitals": "teams/dc.avif",
        "Punjab Kings": "teams/pk.avif",
        "Rajasthan Royals": "teams/rr.webp",
        "Gujarat Titans": "teams/gt.avif",
        "Lucknow Super Giants": "teams/lsg.avif"
    };

    const getLogo = (teamName) => {
        const cleanName = teamName.trim();
        return teamLogos[cleanName] || "https://via.placeholder.com/40";
    };
    const getCountdown = (matchDate, matchId) => {
        const matchTime = new Date(matchDate);
        const diff = matchTime - currentTime;

        if (diff > 0 && diff <= 300000 && !alertedMatches[matchId]) {
            toast.success("Hurry! Less than 5 minutes left to predict!");
            setAlertedMatches(prev => ({ ...prev, [matchId]: true }));
        }

        if (diff <= 0) return "Match Started";

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    useEffect(() => {
        fetch("https://cricketpulse-backend.onrender.com/api/matches/")
            .then(res => res.json())
            .then(data => {
                // console.log("MATCHES:", data);
                setMatches(data);
            })
            .catch(err => console.error("Match fetch error:", err));
    }, []);


    useEffect(() => {
        const token = localStorage.getItem("access");

        if (!token) {
            console.log("Not logged in");
            return;
        }

        fetch("https://cricketpulse-backend.onrender.com/api/my-predictions/", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(async res => {
                if (res.status === 401) {
                    localStorage.removeItem("access");
                    window.location.href = "/login";
                    return;
                }

                if (!res.ok) throw new Error("Error fetching predictions");

                return res.json();
            })
            .then(data => {
                if (data) setPredictions(data);
            })
            .catch(err => console.error("Prediction error:", err));
    }, []);

    return (
        <div className="match">
            <h2>Matches</h2>

            {matches.length === 0 && <p>Loading matches...</p>}

            <div className="filter-buttons">
                <button onClick={() => setFilter("all")}>All Matches</button>
                <button onClick={() => setFilter("today")}>Today's Match</button>
                <button onClick={() => setFilter("remaining")}>Upcoming Matches</button>
            </div>

            {matches
                .filter(match => {
                    if (filter === "today") return isToday(match.match_date);
                    if (filter === "remaining") return !isPredictionClosed(match.match_date);
                    return true;
                })
                .map(match => (
                    <div
                        key={match.id}
                        className={`all ${isToday(match.match_date) ? "today-match" : ""}`}
                    >

                        <div className="teams">
                            <div className="team">
                                <img src={getLogo(match.team1)} alt={match.team1} />
                                <span>{match.team1}</span>
                            </div>

                            <span className="vs">VS</span>

                            <div className="team">
                                <img src={getLogo(match.team2)} alt={match.team2} />
                                <span>{match.team2}</span>
                            </div>
                        </div>

                        <p>Match No : <b>{match.match_number}</b></p>
                        <p>Venue : {match.venue}</p>

                        <p>Date : <b>{formatDate(match.match_date)}</b></p>

                        <p className="countdown">
                            Starts in : <b>{getCountdown(match.match_date, match.id)}</b>
                        </p>

                        <p className="predict">
                            {isPredictionClosed(match.match_date)
                                ? "Match Started (Predictions Closed)"
                                : "Prediction Open"}
                        </p>

                        <div className="buttons">
                            <PredictButton
                                match={match}
                                disabled={isPredictionClosed(match.match_date)}
                                predictions={predictions}
                                setPredictions={setPredictions}
                            />
                        </div>

                    </div>
                ))}
        </div>
    );
}

export default MatchList;