import React from 'react';

const GraphEditor = ({ content, onUpdate }) => {
  const safeContent = content || {
    functions: [{ expression: 'x^2', color: '#2563eb' }],
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    showGrid: true
  };

  const handleFunctionChange = (index, field, value) => {
    const newFunctions = [...safeContent.functions];
    newFunctions[index] = { ...newFunctions[index], [field]: value };
    onUpdate({ ...safeContent, functions: newFunctions });
  };

  const addFunction = () => {
    onUpdate({
      ...safeContent,
      functions: [...safeContent.functions, { expression: '', color: '#000000' }]
    });
  };

  const removeFunction = (index) => {
    const newFunctions = safeContent.functions.filter((_, i) => i !== index);
    onUpdate({ ...safeContent, functions: newFunctions });
  };

  return (
    <div className="space-y-4">
      {/* Paramètres de la fenêtre */}
      <div className="grid grid-cols-4 gap-2 text-sm">
        <div>
          <label>X Min</label>
          <input 
            type="number" className="w-full p-1 border rounded"
            value={safeContent.xMin} 
            onChange={e => onUpdate({...safeContent, xMin: Number(e.target.value)})} 
          />
        </div>
        <div>
          <label>X Max</label>
          <input 
            type="number" className="w-full p-1 border rounded"
            value={safeContent.xMax} 
            onChange={e => onUpdate({...safeContent, xMax: Number(e.target.value)})} 
          />
        </div>
        <div>
          <label>Y Min</label>
          <input 
            type="number" className="w-full p-1 border rounded"
            value={safeContent.yMin} 
            onChange={e => onUpdate({...safeContent, yMin: Number(e.target.value)})} 
          />
        </div>
        <div>
          <label>Y Max</label>
          <input 
            type="number" className="w-full p-1 border rounded"
            value={safeContent.yMax} 
            onChange={e => onUpdate({...safeContent, yMax: Number(e.target.value)})} 
          />
        </div>
      </div>

      {/* Liste des fonctions */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Fonctions à tracer</label>
        {safeContent.functions.map((fn, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input
              type="color"
              className="w-8 h-9 p-0.5 border rounded cursor-pointer"
              value={fn.color}
              onChange={(e) => handleFunctionChange(idx, 'color', e.target.value)}
            />
            <div className="flex-1 relative">
              <span className="absolute left-2 top-2 text-gray-400 text-sm">f(x)=</span>
              <input
                type="text"
                className="w-full p-2 pl-12 border rounded font-mono"
                value={fn.expression}
                onChange={(e) => handleFunctionChange(idx, 'expression', e.target.value)}
                placeholder="@a x^2 + @b"
              />
            </div>
            <button 
              onClick={() => removeFunction(idx)}
              className="text-red-500 hover:bg-red-50 p-2 rounded"
            >
              ×
            </button>
          </div>
        ))}
        <button 
          onClick={addFunction}
          className="text-sm text-blue-600 hover:underline"
        >
          + Ajouter une fonction
        </button>
      </div>
    </div>
  );
};

export default GraphEditor;