import { useState } from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

import calciumImg from './assets/calcium.webp';
import megachadImg from './assets/megachad.webp';
import foxImg from './assets/fox.webp';
import spacemanImg from './assets/spaceman.webp';
import bushImg from './assets/bush.webp';
import cl4nkImg from './assets/cl4nk.webp';
import sirOofieImg from './assets/sir-oofie.webp';
import monkeImg from './assets/monke.webp';

import boneImg from './assets/weapon/bone.webp';
import auraImg from './assets/weapon/aura.webp';
import firestaffImg from './assets/weapon/firestaff.webp';
import blackHoleImg from './assets/weapon/black-hole.webp';
import sniperRifleImg from './assets/weapon/sniper-rifle.webp';
import revolverImg from './assets/weapon/revolver.webp';
import swordImg from './assets/weapon/sword.webp';
import bananarangImg from './assets/weapon/bananarang.webp';

const SYMBOL_PLAYER1 = 'B';
const SYMBOL_PLAYER2 = 'V';

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const personajes = [
  {
    name: 'Calcium',
    src: calciumImg,
    arma: boneImg
  },
  {
    name: 'Megachad',
    src: megachadImg,
    arma: auraImg
  },
  {
    name: 'Fox',
    src: foxImg,
    arma: firestaffImg
  },
  {
    name: 'Spaceman',
    src: spacemanImg,
    arma: blackHoleImg
  },
  {
    name: 'Bush',
    src: bushImg,
    arma: sniperRifleImg
  },
  {
    name: 'Cl4nk',
    src: cl4nkImg,
    arma: revolverImg
  },
  {
    name: 'Sir Oofie',
    src: sirOofieImg,
    arma: swordImg
  },
  {
    name: 'Monke',
    src: monkeImg,
    arma: bananarangImg
  }
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