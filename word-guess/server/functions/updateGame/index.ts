import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { gameId, playerName, guess } = JSON.parse(event.body || "{}");

    if (!gameId || !playerName || !guess) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "You have to make a guess!" }),
      };
    }

    const game = await dynamoDb
      .get({
        TableName: "WordGuessingGames",
        Key: { gameId },
      })
      .promise();

    if (!game.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Couldnt find that game" }),
      };
    }

    const {
      word,
      guessedLetters,
      remainingAttempts,
      playerTurn,
      gameOver,
      players,
    } = game.Item;

    if (gameOver) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Games over" }),
      };
    }

    // Check for player 2 and then indicate to user the need to play as player2
    if (!players.player2 && playerName !== players.player1) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "You have to play as player 2 " }),
      };
    }

    if (playerName !== playerTurn) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Its not your turn" }),
      };
    }

    if (playerName !== players.player1 && playerName !== players.player2) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "You cant play if your not in the game!",
        }),
      };
    }

    if (!/^[a-zA-Z]$/.test(guess)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "It needs to be a letter!" }),
      };
    }

    const guessLower = guess.toLowerCase();

    if (guessedLetters.includes(guessLower)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "That letter has been guessed!" }),
      };
    }

    const newGuessedLetters = [...guessedLetters, guessLower];

    let isCorrectGuess = false;
    if (word.includes(guessLower)) {
      isCorrectGuess = true;
    }

    let newRemainingAttempts = remainingAttempts;
    if (!isCorrectGuess) {
      newRemainingAttempts = remainingAttempts - 1;
    }

    // Check if for letters in the word to see if game ends
    let allLettersGuessed = true;
    for (const letter of word.split("")) {
      if (!newGuessedLetters.includes(letter)) {
        allLettersGuessed = false;
        break;
      }
    }

    let isGameOver = false;
    if (newRemainingAttempts <= 0 || allLettersGuessed) {
      isGameOver = true;
    }

    let winner = null;
    if (isGameOver && newRemainingAttempts > 0) {
      winner = playerName;
    }

    let nextPlayerTurn;

    //switch turns if there is another player
    if (!players.player2) {
      nextPlayerTurn = players.player1;
    } else {
      if (playerName === players.player1) {
        nextPlayerTurn = players.player2;
      } else {
        nextPlayerTurn = players.player1;
      }
    }

    if (isGameOver) {
      nextPlayerTurn = playerTurn;
    }

    // Update the game state in DynamoDB
    await dynamoDb
      .update({
        TableName: "WordGuessingGames",
        Key: { gameId },
        UpdateExpression:
          "SET guessedLetters = :guessedLetters, remainingAttempts = :remainingAttempts, playerTurn = :playerTurn, gameOver = :gameOver, winner = :winner",
        ExpressionAttributeValues: {
          ":guessedLetters": newGuessedLetters,
          ":remainingAttempts": newRemainingAttempts,
          ":playerTurn": nextPlayerTurn,
          ":gameOver": isGameOver,
          ":winner": winner,
        },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        word,
        guessedLetters: newGuessedLetters,
        remainingAttempts: newRemainingAttempts,
        playerTurn: nextPlayerTurn,
        gameOver: isGameOver,
        winner,
      }),
    };
  } catch (error) {
    console.error("Error updating game:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
