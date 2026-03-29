export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Fin del Juego</h2>
      {winner && <p>{winner} GANO!</p>}
      {!winner && <p>Perdieron los dos...</p>}
      <p>
        <button onClick={onRestart}>Revancha?</button>
      </p>
    </div>
  );
}
