import { useState } from 'react';
export default function Avatar({ personajes, selected, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div id="avatar">
      {selected && (
        <img
          src={selected.src}
          alt={selected.name}
          onClick={() => setOpen(!open)}
        />
      )}

      {open && (
        <div className="avatar-options">
          {personajes.map((p) => (
            <img
              key={p.src}
              src={p.src}
              alt={p.name}
              className={selected?.src === p.src ? 'selected' : ''}
              onClick={() => {
                onSelect(p); // 🔥 sube el cambio
                setOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}