import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GameService from "../service/GameService";

const JoinGame = () => {
  const [gameId, setGameId] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const joinGame = async () => {
    try {
      const response = await GameService.joinGame(gameId, player2Name);
      setSuccess(response.message);
      setError("");
      navigate(`/game/${gameId}`);
    } catch (err) {
      setError(
        "Failed to join the game. Please check the game ID and try again."
      );
    }
  };

  return (
    <div>
      <h2>Join a Game</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <div>
        <label>
          Game ID:
          <input
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Player 2 Name:
          <input
            type="text"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
          />
        </label>
      </div>
      <button onClick={joinGame}>Join Game</button>
      <div className="card">
        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default JoinGame;
