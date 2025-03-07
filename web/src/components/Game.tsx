import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GameService from "../service/GameService";
import { Link } from "react-router-dom";

import { GameState } from "../service/GameService";

const Game = () => {
  const { gameId } = useParams();
  const [playerName, setPlayerName] = useState("");
  const [guess, setGuess] = useState("");
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [error, setError] = useState("");

  const fetchGameState = async () => {
    if (!gameId) return;
    try {
      const response = await GameService.getGame(gameId);
      setGameState(response);
    } catch (err) {
      setError("Failed to fetch game state.");
    }
  };

  const makeGuess = async () => {
    try {
      if (!gameId) return;
      const response = await GameService.updateGame(gameId, playerName, guess);
      setGameState(response);
      setError("");
    } catch (err: any) {
      setError(err.response.data.error);
    }
  };

  useEffect(() => {
    fetchGameState();
    const interval = setInterval(fetchGameState, 10000);
    return () => clearInterval(interval);
  }, [gameId]);

  if (!gameState) {
    return <div>Loading...</div>;
  }

  const displayWord = gameState.gameOver
    ? gameState.word
    : gameState.word
        .split("")
        .map((letter) =>
          gameState.guessedLetters.includes(letter) ? letter : "_"
        )
        .join(" ");

  return (
    <div>
      <h2>Game ID: {gameId}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>
          Your Name:
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Your Guess:
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
        </label>
        <button onClick={makeGuess}>Submit Guess</button>
      </div>
      <div>
        <h3>Game State</h3>
        <p>Word: {displayWord}</p>
        <p>Guessed Letters: {gameState.guessedLetters.join(", ")}</p>
        <p>Remaining Attempts: {gameState.remainingAttempts}</p>
        <p>Player Turn: {gameState.playerTurn}</p>
        {gameState.gameOver && (
          <p>
            {gameState.winner ? `Winner: ${gameState.winner}` : "Game Over!"}
          </p>
        )}
      </div>
      <div className="card">
        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Game;
