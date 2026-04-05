import { useState } from "react";
import "./css/Chatbot.css";

function Chatbot() {

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    { text: "Hi , I'm CricketPulse AI. Ask me anything!", sender: "bot" }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);


  const sendMessage = async (msg = input) => {

    if (!msg.trim()) return;

    const userMsg = { text: msg, sender: "user" };
    setMessages(prev => [...prev, userMsg]);

    setInput("");
    setLoading(true);

    try {


      if (msg.includes("vs")) {

        const parts = msg.split("vs");
        const team1 = parts[0].trim().toUpperCase();
        const team2 = parts[1].trim().toUpperCase();

        const res = await fetch("https://cricketpulse-backend.onrender.com/api/predictmatch/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            home_team: team1,
            away_team: team2,
            toss_won: team1,
            decision: "BOWL FIRST",
            venue_name: "M.Chinnaswamy Stadium, Bengaluru"
          })
        });

        const data = await res.json();

        const botMsg = {
          text: `🤖 AI Prediction: ${data.prediction} (${data.confidence}%)`,
          sender: "bot"
        };

        setMessages(prev => [...prev, botMsg]);
        setLoading(false);
        return;
      }


      const res = await fetch("https://cricketpulse-backend.onrender.com/api/chat-ai/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: msg })
      });

      const data = await res.json();

      const botMsg = {
        text: data.reply || "No response",
        sender: "bot"
      };

      setMessages(prev => [...prev, botMsg]);

    } catch (err) {

      setMessages(prev => [
        ...prev,
        { text: "Server error", sender: "bot" }
      ]);

    }

    setLoading(false);
  };

  const quickOptions = [
    "CSK vs RCB",
    "MI vs KKR",
    "Predict today match"
  ];

  return (
    <>
      {/* Floating Button */}
      <div className="chatbot-btn" onClick={() => setOpen(!open)}>
        <img src="./cricket_ai.png" alt="AI" />
      </div>


      {open && (

        <div className="chatbox">

          {/* Header */}
          <div className="chat-header">
            <span>CricketPulse AI</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>


          {/* Chat Messages */}
          <div className="chat-body">

            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="chat-msg bot">Thinking...</div>
            )}

          </div>


          {/* QUICK OPTIONS */}

          <div className="quick-options">

            {quickOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(opt)}
              >
                {opt}
              </button>
            ))}

          </div>


          {/* Input */}

          <div className="chat-input">

            <input
              type="text"
              value={input}
              placeholder="Ask something like (eg:SRH VS MI)..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button onClick={() => sendMessage()}>Send</button>

          </div>

        </div>

      )}

    </>
  );
}

export default Chatbot;