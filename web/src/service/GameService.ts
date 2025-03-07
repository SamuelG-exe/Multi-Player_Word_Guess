import axios from "axios";

interface GameResponse {
  message: string;
  gameId: string;
}

export interface GameState {
  word: string;
  guessedLetters: string[];
  remainingAttempts: number;
  playerTurn: string;
  gameOver: boolean;
  winner?: string;
}

const API_BASE_URL = {
  createGame: "https://xngemn5hne.execute-api.us-east-1.amazonaws.com",
  getGame: "https://7h8ayb2hg6.execute-api.us-east-1.amazonaws.com",
  joinGame: "https://io7r60j6m6.execute-api.us-east-1.amazonaws.com",
  updateGame: "https://f9aorudd29.execute-api.us-east-1.amazonaws.com",
};

class GameService {
  static async createGame(
    player1Name: string,
    length: number
  ): Promise<GameResponse> {
    const response = await axios.post<GameResponse>(
      `${API_BASE_URL.createGame}/createGame`,
      {
        player1Name,
        length,
      }
    );
    return response.data;
  }

  static async getGame(gameId: string): Promise<GameState> {
    const response = await axios.get<GameState>(
      `${API_BASE_URL.getGame}/getGame`,
      {
        params: { gameId },
      }
    );
    return response.data;
  }

  static async joinGame(
    gameId: string,
    player2Name: string
  ): Promise<GameResponse> {
    const response = await axios.post<GameResponse>(
      `${API_BASE_URL.joinGame}/joinGame`,
      {
        gameId,
        player2Name,
      }
    );
    return response.data;
  }

  static async updateGame(
    gameId: string,
    playerName: string,
    guess: string
  ): Promise<GameState> {
    const response = await axios.post<GameState>(
      `${API_BASE_URL.updateGame}/updateGame`,
      {
        gameId,
        playerName,
        guess,
      }
    );
    return response.data;
  }
}

export default GameService;
