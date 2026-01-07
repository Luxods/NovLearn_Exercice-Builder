import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const SignTableEditor = ({ content, onUpdate }) => {
  const safeContent = {
    headers: ["x", "f(x)"],
    intervals: [], // { val: "-inf", sign: "+" }
    ...content
  };

  const addInterval = () => {
    onUpdate({
      ...safeContent,
      intervals: [...safeContent.intervals, { val: "", sign: "+" }]
    });
  };

  const updateInterval = (index, field, value) => {
    const newInts = [...safeContent.intervals];
    newInts[index] = { ...newInts[index], [field]: value };
    onUpdate({ ...safeContent, intervals: newInts });
  };

  const removeInterval = (index) => {
    onUpdate({
      ...safeContent,
      intervals: safeContent.intervals.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">Intervalles</div>
      {safeContent.intervals.map((item, idx) => (
        <div key={idx} className="flex gap-2 items-center bg-gray-50 p-2 rounded">
          <div className="w-1/3">
            <label className="text-[10px] text-gray-500 uppercase">Borne / Racine</label>
            <input 
              className="w-full p-1 border rounded font-mono text-sm"
              value={item.val} onChange={e => updateInterval(idx, 'val', e.target.value)}
              placeholder="@x1"
            />
          </div>
          <div className="w-1/3">
            <label className="text-[10px] text-gray-500 uppercase">Signe après</label>
            <select 
              className="w-full p-1 border rounded text-sm"
              value={item.sign} onChange={e => updateInterval(idx, 'sign', e.target.value)}
            >
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="0">0 (Racine)</option>
              <option value="z">|| (Interdit)</option>
            </select>
          </div>
          <button onClick={() => removeInterval(idx)} className="text-red-400"><Trash2 size={16}/></button>
        </div>
      ))}
      <button onClick={addInterval} className="flex items-center gap-1 text-sm text-blue-600">
        <Plus size={14}/> Ajouter
      </button>
    </div>
  );
};
export default SignTableEditor;