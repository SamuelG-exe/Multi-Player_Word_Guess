import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GameService from "../service/GameService";

const NewGame = () => {
  const [player1Name, setPlayer1Name] = useState("");
  const [wordLength, setWordLength] = useState(7);
  const [gameId, setGameId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const startNewGame = async () => {
    try {
      const response = await GameService.createGame(player1Name, wordLength);
      setGameId(response.gameId);
      setError("");
      navigate(`/game/${response.gameId}`);
    } catch (err) {
      setError("Failed to start a new game. Please try again.");
    }
  };

  return (
    <div>
      <h2>Start a New Game</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {gameId && (
        <p>
          Game ID: {gameId} - Share this ID with your friend to join the game!
        </p>
      )}
      <div>
        <label>
          Player 1 Name:
          <input
            type="text"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Word Length:
          <input
            type="number"
            value={wordLength}
            onChange={(e) => setWordLength(parseInt(e.target.value))}
            min="5"
            max="10"
          />
        </label>
      </div>
      <button onClick={startNewGame}>Start Game</button>
      <div className="card">
        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NewGame;
