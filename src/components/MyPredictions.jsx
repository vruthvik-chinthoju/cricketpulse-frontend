import { useEffect, useState } from "react";
import "./css/MyPredictions.css";

function MyPredictions() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("access");

        if (!token) {
            console.log("Not logged in");
            setLoading(false);
            return;
        }

        fetch("https://cricketpulse-backend.onrender.com/api/my-predictions/", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(async (res) => {
                // console.log("STATUS:", res.status);

                if (res.status === 401) {
                    console.log("Token expired or invalid");
                    return;
                }

                if (!res.ok) throw new Error("Failed");

                return res.json();
            })
            .then((data) => {
                if (data) setData(data);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="mypredictions">
            <h2>My Predictions</h2>

            {loading && <p>Loading...</p>}

            {!loading && data.length === 0 && <p>No predictions yet</p>}

            {data.map((p) => (
                <div key={p.id} className="prediction-row">

                    <div className="match-info">
                        <p className="match-no">Match <b>{p.match_number}</b></p>
                        <p className="teams">{p.team1} vs {p.team2}</p>
                    </div>

                    <div className="prediction-info">
                        <p>Your Pick</p>
                        <b>{p.predicted_team}</b>

                        <p
                            className="status correct"
                            style={{
                                color:
                                    p.winner
                                        ? p.predicted_team === p.winner
                                            ? "green"
                                            : "red"
                                        : "orange"
                            }}
                        >
                            {p.winner
                                ? p.predicted_team === p.winner
                                    ? "Correct"
                                    : "Wrong"
                                : "Pending"}
                        </p>
                    </div>

                    <div className="points">
                        <p>Points</p>
                        <b>{p.points} 🪙</b>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default MyPredictions;