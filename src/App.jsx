import { useState } from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import Avatar from './components/Avatar.jsx';

const SYMBOL_PLAYER1 = 'B';
const SYMBOL_PLAYER2 = 'V';

const PLAYERS = {
  [SYMBOL_PLAYER1]: 'Calcio',
  [SYMBOL_PLAYER2]: 'Megachad'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = SYMBOL_PLAYER1;

  if (gameTurns.length > 0 && gameTurns[0].player === SYMBOL_PLAYER1) {
    currentPlayer = SYMBOL_PLAYER2;
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

const personajes = [
  { name: 'Calcium', 
    src: '/src/assets/calcium.webp',
    arma: '/src/assets/weapon/bone.webp'
  },
  { name: 'Megachad', 
    src: '/src/assets/megachad.webp',
    arma: '/src/assets/weapon/aura.webp'
  },
  { name: 'Fox', 
    src: '/src/assets/fox.webp',
    arma: '/src/assets/weapon/firestaff.webp'
  },
  { name: 'Spaceman', 
    src: '/src/assets/spaceman.webp',
    arma: '/src/assets/weapon/black-hole.webp'
  },
  { name: 'Bush', 
    src: '/src/assets/bush.webp',
    arma: '/src/assets/weapon/sniper-rifle.webp'
  },
  { name: 'Cl4nk', 
    src: '/src/assets/cl4nk.webp',
    arma: '/src/assets/weapon/revolver.webp'
  },
  { name: 'Sir Oofie', 
    src: '/src/assets/sir-oofie.webp',
    arma: '/src/assets/weapon/sword.webp'
  },
  { name: 'Monke', 
    src: '/src/assets/monke.webp',
    arma: '/src/assets/weapon/bananarang.webp'
  },
];

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS[SYMBOL_PLAYER1]}
            symbol={SYMBOL_PLAYER1}
            isActive={activePlayer === SYMBOL_PLAYER1}
            onChangeName={handlePlayerNameChange}
            personajes={personajes}
          />
          <Player
            initialName={PLAYERS[SYMBOL_PLAYER2]}
            symbol={SYMBOL_PLAYER2}
            isActive={activePlayer === SYMBOL_PLAYER2}
            onChangeName={handlePlayerNameChange}
            personajes={personajes}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
