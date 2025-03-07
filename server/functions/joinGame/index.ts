import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { gameId, player2Name } = JSON.parse(event.body || "{}");

    if (!gameId || !player2Name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Make sure you pick a game and a name" }),
      };
    }

    // get the game from the database
    const game = await dynamoDb
      .get({
        TableName: "WordGuessingGames",
        Key: { gameId },
      })
      .promise();

    if (!game.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Sorry cant find that game" }),
      };
    }

    // Check if there is already a player 2
    if (game.Item.players.player2) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Game is full, sorry" }),
      };
    }

    await dynamoDb
      .update({
        TableName: "WordGuessingGames",
        Key: { gameId },
        UpdateExpression: "SET players.player2 = :player2Name",
        ExpressionAttributeValues: {
          ":player2Name": player2Name,
        },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        gameId,
        players: {
          player1: game.Item.players.player1,
          player2: player2Name,
        },
        message: "Youre INNN",
      }),
    };
  } catch (error) {
    console.error("Error joining game:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
