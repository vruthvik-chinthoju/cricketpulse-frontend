import { useEffect, useState } from "react";
import "./css/stats.css";

function Teams() {

  const [teams, setTeams] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState("2025");

  const getPlayerStats = async (id) => {
    setLoading(true);

    try{
      const res = await fetch(`https://cricketpulse-backend.onrender.com/api/ipl/player/${id}`);
      const data = await res.json();

      if(data.error){
        alert(data.error);
        setLoading(false);
        return;
      }

      setSelectedPlayer(data);

    }catch(err){
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {

    fetch(`https://cricketpulse-backend.onrender.com/api/ipl/teams/${year}`)
      .then(res => res.json())
      .then(data => {

        if(data.error){
          alert(data.message);
          setTeams([]);
          return;
        }

        setTeams(data.data || []);
      });

  },[year]);


  return (

    <div className="stats-box">

      <h2>IPL <b>{year}</b> Teams</h2>

      {/* YEAR BUTTONS */}

      <div className="year-buttons">
        <label>Years :</label>
        <button onClick={()=>setYear("2025")}>2025</button>
        <button onClick={()=>setYear("2024")}>2024</button>
        <button onClick={()=>setYear("2023")}>2023</button>
        <button onClick={()=>setYear("2022")}>2022</button>
      </div>


      {/* TEAMS */}

      {teams.map((team,index)=>(
        <div key={index} className="team-card">

          <div className="team-header">
            <img src={team.img} alt={team.teamName}/>
            <h3>{team.teamName} ({team.shortname})</h3>
          </div>


          <div className="players-grid">

            {team.players?.map((player,i)=>(
              <div
                key={i}
                className="player-card"
                onClick={()=>getPlayerStats(player.id)}
              >

                <img src={player.playerImg} alt={player.name}/>

                <h4>{player.name}</h4>
                <p>{player.role}</p>
                <p>{player.country}</p>

              </div>
            ))}

          </div>

        </div>
      ))}


      {/* PLAYER MODAL */}

      {selectedPlayer && (

        <div
          className="modal-overlay"
          onClick={()=>setSelectedPlayer(null)}
        >

          <div
            className="modal-content"
            onClick={(e)=>e.stopPropagation()}
          >

            <span
              className="close-btn"
              onClick={()=>setSelectedPlayer(null)}
            >
              ✖
            </span>

            {loading ? (

              <p>Loading...</p>

            ) : (

              <>

                <img src={selectedPlayer.playerImg} alt={selectedPlayer.name}/>

                <h2>{selectedPlayer.name}</h2>

                <p><b>Role:</b> {selectedPlayer.role}</p>
                <p><b>Batting:</b> {selectedPlayer.battingStyle}</p>
                <p><b>Bowling:</b> {selectedPlayer.bowlingStyle}</p>
                <p><b>Birth:</b> {selectedPlayer.placeOfBirth}</p>
                <p><b>Country:</b> {selectedPlayer.country}</p>

                {selectedPlayer.formatted_stats && (

                  <div className="stats-section">

                    {Object.entries(selectedPlayer.formatted_stats)
                      .slice(0,4)
                      .map(([type,stats])=>(
                      <div key={type} className="stat-block">

                        <h4>{type.toUpperCase()}</h4>

                        {Object.entries(stats).map(([stat,value])=>(
                          <p key={stat}>
                            <span>{stat.toUpperCase()}</span>
                            <span>{value}</span>
                          </p>
                        ))}

                      </div>
                    ))}

                  </div>

                )}

              </>

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default Teams;