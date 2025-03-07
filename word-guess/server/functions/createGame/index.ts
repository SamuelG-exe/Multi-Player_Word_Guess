import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { fetchWordFromAPI } from "../api";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { player1Name, player2Name } = JSON.parse(event.body || "{}");

    let length = 7; // Default length
    if (event.queryStringParameters && event.queryStringParameters.length) {
      length = parseInt(event.queryStringParameters.length);
    }

    if (!validateLength(length)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "has to be between 5 and 10 letters" }),
      };
    }

    if (!player1Name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "You gotta pick a name!" }),
      };
    }

    // get a random word
    const word = await fetchWordFromAPI(length);

    const gameState = {
      gameId: generateGameId(),
      word: word.toLowerCase(),
      guessedLetters: [],
      remainingAttempts: 7,
      players: {
        player1: player1Name,
        player2: player2Name || null,
      },
      playerTurn: player1Name,
      gameOver: false,
      winner: null,
      createdAt: new Date().toISOString(),
    };

    await dynamoDb
      .put({
        TableName: "WordGuessingGames",
        Item: gameState,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        gameId: gameState.gameId,
        wordLength: length,
        players: {
          player1: player1Name,
          player2: player2Name || null,
        },
      }),
    };
  } catch (error) {
    console.error("Whoops:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

const generateGameId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

const validateLength = (length: number): boolean => {
  return length >= 5 && length <= 10;
};
