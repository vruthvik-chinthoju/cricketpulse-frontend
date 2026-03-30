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
        <div className="ra">Rank</div>
        <div className="user">Username</div>
        <div className="points">Points</div>
        <div className="acc">Accuracy</div>
      </div>


      {data.map((user) => (
        <div key={user.rank} className="leaderboard-row">

          <div className="rank"># <b>{user.rank}</b></div>

          <div className="username">{user.user}</div>

          <div className="points"><b>{user.points} </b>pts</div>

          <div className="accuracy"><b>{user.accuracy}</b>%</div>

        </div>
      ))}
    </div>
  );
}

export default Leaderboard;