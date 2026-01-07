import React from 'react';

const EquationEditor = ({ content, onUpdate }) => {
  const safeContent = { latex: "@a x + @b = 0", ...content };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Équation (LaTeX)</label>
      <input 
        type="text"
        className="w-full p-2 border rounded font-mono"
        value={safeContent.latex}
        onChange={(e) => onUpdate({ ...safeContent, latex: e.target.value })}
        placeholder="Ex: @a x^2 + @b x + @c = 0"
      />
      <p className="text-xs text-gray-500 mt-1">Utilisez <code>@variable</code>.</p>
    </div>
  );
};
export default EquationEditor;