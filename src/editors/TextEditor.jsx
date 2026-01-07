import React from 'react';

const TextEditor = ({ content, onUpdate }) => {
  const text = typeof content === 'string' ? content : content?.text || '';

  const handleChange = (e) => {
    // Si la structure attend un objet, on garde l'objet, sinon string
    if (typeof content === 'object' && content !== null) {
      onUpdate({ ...content, text: e.target.value });
    } else {
      onUpdate(e.target.value);
    }
  };

  return (
    <div className="space-y-2">
      <textarea
        className="w-full p-3 border rounded-lg h-32 text-sm font-mono"
        value={text}
        onChange={handleChange}
        placeholder="Soit une fonction $f$ définie sur @I..."
      />
      <div className="flex justify-between text-xs text-gray-500">
        <p>• LaTeX inline : <code>$x^2$</code></p>
        <p>• LaTeX bloc : <code>$$x^2$$</code></p>
        <p>• Variables : <code>@nom</code></p>
      </div>
    </div>
  );
};

export default TextEditor;