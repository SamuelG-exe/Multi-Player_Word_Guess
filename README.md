# Multi-Player Word Guessing Game

## Overview

This is a multi-player word guessing game built using AWS Lambda for the backend and GitHub Pages for hosting the frontend. The game mimics a dynamic experience through automatic refreshing every 10 seconds and API calls to AWS Lambda functions.

## Features Implemented

* Backend: Fully serverless backend using AWS Lambda and API Gateway.

* Frontend: Static webpage hosted via GitHub Pages with API calls for dynamic behavior.

* Database: Uses DynamoDB to store game state.

## Game Logic:

* Players take turns guessing letters.

* Input validation prevents invalid actions such as guessing the same letter twice or playing out of turn.

* The game ends when players either guess the word or reach the maximum number of incorrect attempts.

## Features Not Yet Implemented

* Leaderboard: No Lambda function or UI representation yet.

* Replay Button: Players must refresh to start a new game.

* Hint System: No hinting mechanism is available.

* Fail Sharing: The number of incorrect guesses is shared among players rather than being individual.

## Design Choices

* Highlighting AWS and GitHub Knowledge: This project showcases my ability to leverage AWS Lambda and GitHub Pages effectively.

* Experimenting with Serverless and Static Hosting: I wanted to explore how to make a dynamic site without a traditional backend server.

* Lambda Exploration: This project allowed me to learn more about the power and limitations of AWS Lambda.

## Future Improvements

* Complete Missing Features: Add leaderboard, hint system, and replay functionality.

* WebSockets Implementation: Replace HTTP API calls with AWS WebSocket API for real-time updates.

* Solo/Bot Play: Implement a single-player mode against a bot.

* Scalability: Extend the game to support more than two players (DynamoDB is already structured to support multiple players).

* Testing: Improve stability and performance through unit and integration testing.

## How to Play

1. Open the game via the GitHub Pages link.

2. Either create a new game or join an existing one.

3. Take turns guessing letters.

4. The game ends when the word is guessed or attempts run out.

5. Click home and New game to play again.

## Technologies Used

* Frontend: HTML, CSS, JavaScript (TypeScript)

* Backend: AWS Lambda, API Gateway

* Database: DynamoDB

* Hosting: GitHub Pages

## Setup and Deployment

1. Clone this repository.

2. Deploy AWS Lambda functions and configure API Gateway.

3. Update frontend API calls to point to the correct endpoints.

4. Build Project and deploy "dist" folder

5. Host frontend via GitHub Pages.
