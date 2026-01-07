import React from 'react';
import { Plus, Trash2, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const VariationTableEditor = ({ content, onUpdate }) => {
  const safeContent = {
    headers: ["x", "f(x)"],
    columns: [],
    ...content
  };

  const addColumn = () => {
    onUpdate({
      ...safeContent,
      columns: [...safeContent.columns, { x: "", val: "", variation: "" }]
    });
  };

  const updateColumn = (index, field, value) => {
    const newCols = [...safeContent.columns];
    newCols[index] = { ...newCols[index], [field]: value };
    onUpdate({ ...safeContent, columns: newCols });
  };

  const removeColumn = (index) => {
    onUpdate({
      ...safeContent,
      columns: safeContent.columns.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700">Points du tableau</div>
      
      <div className="space-y-2">
        {safeContent.columns.map((col, idx) => (
          <div key={idx} className="flex gap-2 items-center bg-gray-50 p-2 rounded border">
            {/* X */}
            <div className="w-1/4">
              <label className="text-[10px] uppercase text-gray-500">X</label>
              <input 
                className="w-full p-1 border rounded text-sm font-mono"
                value={col.x} 
                onChange={e => updateColumn(idx, 'x', e.target.value)}
                placeholder="-∞"
              />
            </div>

            {/* Variation */}
            <div className="w-1/4">
              <label className="text-[10px] uppercase text-gray-500">Sens</label>
              <select 
                className="w-full p-1 border rounded text-sm"
                value={col.variation} 
                onChange={e => updateColumn(idx, 'variation', e.target.value)}
              >
                <option value="">Normal</option>
                <option value="high">Sommet (Haut)</option>
                <option value="low">Creux (Bas)</option>
              </select>
            </div>

            {/* Valeur f(x) */}
            <div className="w-1/4">
              <label className="text-[10px] uppercase text-gray-500">f(x)</label>
              <input 
                className="w-full p-1 border rounded text-sm font-mono"
                value={col.val} 
                onChange={e => updateColumn(idx, 'val', e.target.value)}
                placeholder="0"
              />
            </div>

            <button onClick={() => removeColumn(idx)} className="text-red-400 hover:text-red-600">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <button onClick={addColumn} className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
        <Plus size={14} /> Ajouter un point
      </button>
    </div>
  );
};

export default VariationTableEditor;