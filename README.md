# Hooks Typing Test Client: A Typing Speed Test With User Uploaded Tests

This application allows users to type along with pre-loaded or user submitted pieces of text and track their speed and accuracy.

## Important Links

- [Server Repo](https://github.com/JoeyGarber/TypingTestAPI)

## Installation instructions

1. Fork and clone this repo
2. Install dependencies with `npm install`
3. Start the frontend server with `npm start`

## Planning Story

Hooks Typing Test Client was created to be half typing speed test, half study tool. 

I really enjoyed doing existing online typing speed tests. The pieces of text were always about the rules of baseball or zebras, and after several rounds I found myself learning those facts from having typed them over and over. I decided I wanted to build a resource where users could learn other information that way, and Hooks Typing Test was born. 

## Design Process

First I allowed users to upload their own pieces of text. They could create, read, and delete pieces of text that they had uploaded, or read one of several preloaded pieces of text. Next, I build the typing functionality. Users could type along with one of those pieces of text, and watch the characters of that text turn red if their input was incorrect and green if it was correct. Keeping track of speed and accuracy was not too difficult to implement after that. Then I set the app up to log a user's results on a given test to the API, and implemented a page to view and sort those results by accuracy, words per minute, chronology, and title of test. 

## User stories

 - As a user, I'll be able to sign up, sign in, sign out, and change my password.
 - As a user, I'll be able to create, read, and delete pieces of text for tests. 
 - As a user, I'll be able to type along with pieces of text.
 - As a user, I'd like to be able to type pieces of text that other users have written.
 - As a user, I'd like to be able to view and sort my results.

## Technologies Used

- JavaScript
- Express.js
- MongoDb
- Mongoose
- React
- Bootstrap
- HTML/CSS

## Unsolved Problems

- I would like users to be able to see and try tests that other users have created. The API is set up to handle that should a user be sent a link, but I have not built a "leaderboard."
- Words per minute counts can be skewed for very short tests.