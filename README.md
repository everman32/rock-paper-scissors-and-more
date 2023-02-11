# rock-scissors-papper-and-more-app

![GitHub release (latest by date)](https://img.shields.io/github/v/release/everman32/rock-scissors-papper-and-more-app) [![GitHub stars](https://img.shields.io/github/stars/everman32/rock-scissors-papper-and-more-app)](https://github.com/everman32/rock-scissors-papper-and-more-app/stargazers) [![GitHub forks](https://img.shields.io/github/forks/everman32/rock-scissors-papper-and-more-app)](https://github.com/everman32/rock-scissors-papper-and-more-app/network) [![GitHub issues](https://img.shields.io/github/issues/everman32/rock-scissors-papper-and-more-app)](https://github.com/everman32/rock-scissors-papper-and-more-app/issues) [![GitHub license](https://img.shields.io/github/license/everman32/rock-scissors-papper-and-more-app)](https://github.com/everman32/rock-scissors-papper-and-more-app)

![logo](https://i.ibb.co/Qk5mDjZ/logo.png)

Rock-scissors-papper-and-more-app is a extended console implementation of the world famous game

## Installation

Use `npm` as a package manager. Install dependencies from `package.json`:

```bash
npm i
```

## Usage

To start the game, you must complete `npm run start` or simply `npm start` and pass the moveset used in the game, consisting of an odd number:

```bash
npm start move1, move2, move3, ... , move[2N+1]
```

_The game requires at least 3 possible moves, and this number must be odd (e.g. rock, scissors, papper, lizard, spoke). Moves are separated using delimiters such as "," or " "._

### Fraud Protection

Once the game has started, the computer makes a move. Based on the computer's move, an `HMAC` is formed using a `random key` according to the `SHA-256` algorithm.

_This implementation avoids computer cheating (move substitution) after the player has made his move._

For example, the computer made a move, and some `HMAC` was generated and provided: **4f5dfa5af3cb2ee34f5d28d796566b345fb13d301c674f2fff57db1a7db9168a**

The player makes his move, after which the computer's move and the outcome of the confrontation will be shown. It will also display the random key that was used to get the `HMAC` from the computer's move.

In this case, the `scissors` move was made by the computer, and the random key has the following form:
**54c23f5a0ac3dc1b8a7b0957262a86a262d5034bcc85b319405161b8590d9d17**

Based on the received values of the computer's move and a `random key`, using the `HMAC generation service` (e.g [HMAC Generator](https://codebeautify.org/hmac-generator)), you can get the `initial HMAC` **4f5dfa5...**, which confirms that the computer played fairly and did not change the move after the player's move.

### Usage example

Below is the implementation of the above scenario:

![example](https://i.ibb.co/b2zgHm3/example.png)

### Table of outcomes

Below is a scenario that reflects the various outcomes between the player and the computer:

![table](https://i.ibb.co/d74gZfd/table.png)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
