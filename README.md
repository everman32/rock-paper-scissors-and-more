# rock-paper-scissors-and-more-app

![GitHub release (latest by date)](https://img.shields.io/github/v/release/everman32/rock-paper-scissors-and-more-app) [![GitHub stars](https://img.shields.io/github/stars/everman32/rock-paper-scissors-and-more-app)](https://github.com/everman32/rock-paper-scissors-and-more-app/stargazers) [![GitHub forks](https://img.shields.io/github/forks/everman32/rock-paper-scissors-and-more-app)](https://github.com/everman32/rock-paper-scissors-and-more-app/network) [![GitHub issues](https://img.shields.io/github/issues/everman32/rock-paper-scissors-and-more-app)](https://github.com/everman32/rock-paper-scissors-and-more-app/issues) [![GitHub license](https://img.shields.io/github/license/everman32/rock-paper-scissors-and-more-app)](https://github.com/everman32/rock-paper-scissors-and-more-app)

![logo](docs/logo.png)

Extended console implementation of the world famous game

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
*The game requires at least 3 possible moves, and this number must be odd (e.g. rock, scissors, paper, lizard, spoke). Moves are separated using delimiters such as "," or " ".*

### Fraud Protection
Once the game has started, the computer makes a move. Based on the computer's move, an `HMAC` is formed using a `random key` according to the `SHA-256` algorithm.

*This implementation avoids computer cheating (move substitution) after the player has made his move.*

For example, the computer made a move, and some `HMAC` was generated and provided: **613841b31c232c2336113f57e893ac83f7cf4aec6721984e9044c94872f9f214**

The player makes his move, after which the computer's move and the outcome of the confrontation will be shown. It will also display the random key that was used to get the `HMAC` from the computer's move.

In this case, the `scissors` move was made by the computer, and the random key has the following form:
**a4653ad607380d384554bbd22266532eee4625a1219538083e732b779f737608**

Based on the received values of the computer's move and a `random key`, using the `HMAC generation service` (e.g [HMAC Generator](https://codebeautify.org/hmac-generator)), you can get the `initial HMAC` **613841b...**, which confirms that the computer played fairly and did not change the move after the player's move.

### Usage example
Below is the implementation of the above scenario:

![example](docs/example.png)

### Table of outcomes
Below is a scenario that reflects the various outcomes between the player and the computer:

![outcomes](docs/outcomes.png)

*The above table should be read from the **vertical** column, which indicates the **player's** move, to the **horizontal** column, which indicates the **computer's** move.*

*For example, the `player` made a move `rock`, the `computer` made a move `scissors`. According to the table, the `player` wins.*

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)