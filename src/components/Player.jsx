import { useState } from 'react';
import Avatar from './Avatar';

export default function Player({
  symbol,
  player,
  isActive,
  onChangeName,
  personajes,
  onSelectCharacter
}) {
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing(editing => !editing);
  }

  function handleChange(event) {
    onChangeName(symbol, event.target.value);
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <Avatar
        personajes={personajes}
        selected={player}
        onSelect={(p) => onSelectCharacter(symbol, p)}
      />

      <span className="player">
        {isEditing ? (
          <input value={player.name} onChange={handleChange} />
        ) : (
          <span className="player-name">{player.name}</span>
        )}
        {/* <span className="player-symbol">{symbol}</span> */}
      </span>

      <button onClick={handleEditClick}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </li>
  );
}