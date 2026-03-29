
import { useState } from 'react';



export default function Avatar({personajes}) {
      const [selected, setSelected] = useState(personajes?.[0] || null);
      const [open, setOpen] = useState(false);

      return (
      <div id="avatar">
            {/* Imagen seleccionada */}
            {selected && (
                  <img
                        src={selected.src}
                        alt={selected.name}
                        onClick={() => setOpen(!open)}
                  />
            )}

            {/* Dropdown custom */}
            {open && (
            <div className="avatar-options">
                  {personajes.map((p) => (
                        <img
                              key={p.src}
                              src={p.src}
                              alt={p.name}
                              className={selected?.src === p.src ? 'selected' : ''}
                              onClick={() => {
                                    setSelected(p);
                                    setOpen(false);
                              }}
                        />
                  ))}
            </div>
            )}
      </div>
  );
}