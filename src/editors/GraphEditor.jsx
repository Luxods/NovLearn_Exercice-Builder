import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

const isAuto = (v) =>
  v === 'auto' || v === null || v === undefined ||
  (typeof v === 'string' && v.trim().toLowerCase() === 'auto');

// Affiche un champ libre (nombre ou expression "@a-1") + checkbox "auto"
const BoundField = ({ label, value, onChange }) => {
  const auto = isAuto(value);
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm">{label}</label>
        <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={auto}
            onChange={(e) => onChange(e.target.checked ? 'auto' : 0)}
          />
          auto
        </label>
      </div>
      <input
        type="text"
        className="w-full p-1 border rounded text-sm font-mono disabled:bg-gray-100 disabled:text-gray-400"
        value={auto ? '' : String(value ?? '')}
        placeholder={auto ? 'auto' : '-5 ou @a-1'}
        disabled={auto}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw.trim() === '') { onChange(0); return; }
          // Si purement numérique, on stocke en number ; sinon on garde la string (expression)
          const num = Number(raw);
          onChange(!Number.isNaN(num) && /^-?\d*\.?\d+$/.test(raw.trim()) ? num : raw);
        }}
      />
    </div>
  );
};

const GraphEditor = ({ content, onUpdate }) => {
  const safeContent = content || {
    functions: [{ expression: 'x^2', color: '#2563eb' }],
    xMin: -5,
    xMax: 5,
    yMin: 'auto',
    yMax: 'auto',
    showGrid: true,
  };

  const setBound = (key) => (val) => onUpdate({ ...safeContent, [key]: val });

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
      {/* Bornes de la fenêtre */}
      <div className="grid grid-cols-4 gap-3">
        <BoundField label="X Min" value={safeContent.xMin} onChange={setBound('xMin')} />
        <BoundField label="X Max" value={safeContent.xMax} onChange={setBound('xMax')} />
        <BoundField label="Y Min" value={safeContent.yMin} onChange={setBound('yMin')} />
        <BoundField label="Y Max" value={safeContent.yMax} onChange={setBound('yMax')} />
      </div>
      <p className="text-xs text-gray-500 -mt-2">
        Astuce&nbsp;: pour des fonctions à croissance forte (log, exp, racine…), cocher <em>auto</em> sur Y Min/Y Max.
        Les expressions avec variables sont acceptées, ex. <code>@a-1</code> ou <code>2*@a+@b</code>.
      </p>

      {/* Options globales */}
      <div className="flex items-center gap-2">
        <input
          id="showGrid"
          type="checkbox"
          checked={safeContent.showGrid !== false}
          onChange={(e) => onUpdate({ ...safeContent, showGrid: e.target.checked })}
        />
        <label htmlFor="showGrid" className="text-sm">Afficher la grille</label>
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
              title={fn.showExpression === false ? "Afficher l'expression" : "Masquer l'expression"}
              onClick={() => handleFunctionChange(idx, 'showExpression', fn.showExpression === false ? true : false)}
              className={`p-2 rounded ${fn.showExpression === false ? 'text-gray-400 hover:bg-gray-50' : 'text-blue-500 hover:bg-blue-50'}`}
            >
              {fn.showExpression === false ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
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
