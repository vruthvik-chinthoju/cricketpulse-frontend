import { useEffect, useState } from "react";
import "./css/Leaderboard.css"

function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access");

    fetch("https://cricketpulse-backend.onrender.com/api/leaderboard/", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Unauthorized or error fetching leaderboard");
        }
        return res.json();
      })
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="leaderboard">
      <h2>🎖️Leaderboard🎖️</h2>

      <div className="leaderboard-row header">
        <div className="rank">Rank</div>
        <div className="username">Username</div>
        <div className="points">Points</div>
        <div className="accuracy">Accuracy</div>
      </div>


      {data.map((user) => (
        <div key={user.rank} className="leaderboard-row">

          <div className="rank"># {user.rank}</div>

          <div className="username">{user.user}</div>

          <div className="points">{user.points} pts</div>

          <div className="accuracy">{user.accuracy} % </div>

        </div>
      ))}
    </div>
  );
}

export default Leaderboard;