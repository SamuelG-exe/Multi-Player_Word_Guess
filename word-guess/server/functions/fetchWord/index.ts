import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { fetchWordFromAPI } from "../api";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const length = event.queryStringParameters?.length
      ? parseInt(event.queryStringParameters.length)
      : 7;

    if (!validateLength(length)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid word length" }),
      };
    }
    const word = await fetchWordFromAPI(length);
    return {
      statusCode: 200,
      body: JSON.stringify({ word }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

export const validateLength = (length: number): boolean => {
  return length >= 5 && length <= 10;
};
