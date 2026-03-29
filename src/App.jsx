import { useState } from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const SYMBOL_PLAYER1 = 'B';
const SYMBOL_PLAYER2 = 'V';

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const personajes = [
  { name: 'Calcium', src: '/src/assets/calcium.webp', arma: '/src/assets/weapon/bone.webp' },
  { name: 'Megachad', src: '/src/assets/megachad.webp', arma: '/src/assets/weapon/aura.webp' },
  { name: 'Fox', src: '/src/assets/fox.webp', arma: '/src/assets/weapon/firestaff.webp' },
  { name: 'Spaceman', src: '/src/assets/spaceman.webp', arma: '/src/assets/weapon/black-hole.webp' },
  { name: 'Bush', src: '/src/assets/bush.webp', arma: '/src/assets/weapon/sniper-rifle.webp' },
  { name: 'Cl4nk', src: '/src/assets/cl4nk.webp', arma: '/src/assets/weapon/revolver.webp' },
  { name: 'Sir Oofie', src: '/src/assets/sir-oofie.webp', arma: '/src/assets/weapon/sword.webp' },
  { name: 'Monke', src: '/src/assets/monke.webp', arma: '/src/assets/weapon/bananarang.webp' },
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = SYMBOL_PLAYER1;

  if (gameTurns.length > 0 && gameTurns[0].player === SYMBOL_PLAYER1) {
    currentPlayer = SYMBOL_PLAYER2;
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = INITIAL_GAME_BOARD.map(row => [...row]);

  for (const turn of gameTurns) {
    const { square, player } = turn;
    gameBoard[square.row][square.col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const a = gameBoard[combination[0].row][combination[0].column];
    const b = gameBoard[combination[1].row][combination[1].column];
    const c = gameBoard[combination[2].row][combination[2].column];

    if (a && a === b && a === c) {
      winner = players[a].name;
    }
  }

  return winner;
}

export default function App() {
  const [players, setPlayers] = useState({
    [SYMBOL_PLAYER1]: personajes[0],
    [SYMBOL_PLAYER2]: personajes[1],
  });

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectCharacter(symbol, personaje) {
    setPlayers(prev => ({
      ...prev,
      [symbol]: personaje
    }));
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prev => ({
      ...prev,
      [symbol]: {
        ...prev[symbol],
        name: newName
      }
    }));
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      return [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            symbol={SYMBOL_PLAYER1}
            player={players[SYMBOL_PLAYER1]}
            isActive={activePlayer === SYMBOL_PLAYER1}
            onChangeName={handlePlayerNameChange}
            personajes={personajes}
            onSelectCharacter={handleSelectCharacter}
          />
          <Player
            symbol={SYMBOL_PLAYER2}
            player={players[SYMBOL_PLAYER2]}
            isActive={activePlayer === SYMBOL_PLAYER2}
            onChangeName={handlePlayerNameChange}
            personajes={personajes}
            onSelectCharacter={handleSelectCharacter}
          />
        </ol>

        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}

        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
          players={players}
        />
      </div>

      <Log turns={gameTurns} />
    </main>
  );
}