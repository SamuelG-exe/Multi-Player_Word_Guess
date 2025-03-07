import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const gameId = event.queryStringParameters?.gameId;

    if (!gameId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Youre missing the gameId" }),
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
        body: JSON.stringify({ error: "Cant find the game" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(game.Item),
    };
  } catch (error) {
    console.error("Get returned a nope:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
