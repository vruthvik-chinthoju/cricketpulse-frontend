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

      const res = await fetch("https://cricketpulse-backend.onrender.com/api/chat-ai/",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({ message: msg })
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
    "Team list",
    "Team stats",
    "Predict today match",
    "CSK vs RCB",
    "Top players"
  ];


  return (
    <>
      {/* Floating Button */}
      <div className="chatbot-btn" onClick={()=>setOpen(!open)}>
        <img src="./cricket_ai.png" alt="AI"/>
      </div>


      {open && (

        <div className="chatbox">

          {/* Header */}
          <div className="chat-header">
            <span>CricketPulse AI</span>
            <button onClick={()=>setOpen(false)}>✖</button>
          </div>


          {/* Chat Messages */}
          <div className="chat-body">

            {messages.map((msg,i)=>(
              <div key={i} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="chat-msg bot">Typing...</div>
            )}

          </div>


          {/* QUICK OPTIONS */}

          <div className="quick-options">

            {quickOptions.map((opt,i)=>(
              <button
                key={i}
                onClick={()=>sendMessage(opt)}
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
              placeholder="Ask something..."
              onChange={(e)=>setInput(e.target.value)}
              onKeyDown={(e)=> e.key==="Enter" && sendMessage()}
            />

            <button onClick={()=>sendMessage()}>Send</button>

          </div>

        </div>

      )}

    </>
  );
}

export default Chatbot;