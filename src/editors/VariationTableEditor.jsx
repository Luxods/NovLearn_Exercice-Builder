import { Plus, Trash2 } from "lucide-react";

const VariationTableEditor = ({ content, onUpdate }) => {
  const safeContent = {
    variable: "x",
    function: "f(x)",
    points: [
      { x: "-\\infty", y: "+\\infty", pos: "top" },
      { x: "0", y: "0", pos: "bottom" },
      { x: "+\\infty", y: "+\\infty", pos: "top" },
    ],
    // Compatibilité avec l'ancien format headers
    ...(content?.headers
      ? { variable: content.headers[0], function: content.headers[1] }
      : {}),
    ...content,
  };

  const updateField = (field, value) =>
    onUpdate({ ...safeContent, [field]: value });

  const updatePoint = (index, field, value) => {
    const newPoints = [...safeContent.points];
    newPoints[index] = { ...newPoints[index], [field]: value };
    onUpdate({ ...safeContent, points: newPoints });
  };

  const addPoint = () => {
    const pts = [...safeContent.points];
    const last = pts.pop();
    pts.push({ x: "", y: "", pos: "center" });
    pts.push(last);
    onUpdate({ ...safeContent, points: pts });
  };

  const removePoint = (index) => {
    onUpdate({
      ...safeContent,
      points: safeContent.points.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-5">
      {/* Entêtes */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">
            Variable (ligne 1)
          </label>
          <input
            className="w-full p-1.5 border rounded text-sm font-mono"
            value={safeContent.variable}
            onChange={(e) => updateField("variable", e.target.value)}
          />
        </div>
        <div className="w-1/2">
          <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">
            Fonction (ligne 2)
          </label>
          <input
            className="w-full p-1.5 border rounded text-sm font-mono"
            value={safeContent.function}
            onChange={(e) => updateField("function", e.target.value)}
          />
        </div>
      </div>

      {/* Points */}
      <div>
        <label className="block text-[10px] text-gray-500 font-bold uppercase mb-2">
          Points
        </label>
        <div className="space-y-2">
          {safeContent.points.map((pt, idx) => (
            <div
              key={idx}
              className="flex gap-2 items-center bg-gray-50 p-2 rounded border border-gray-200"
            >
              <div className="w-1/4">
                <label className="text-[10px] uppercase text-gray-500 font-bold">
                  x
                </label>
                <input
                  className="w-full p-1.5 border rounded text-sm font-mono"
                  value={pt.x}
                  onChange={(e) => updatePoint(idx, "x", e.target.value)}
                  placeholder="-\infty"
                />
              </div>
              <div className="w-1/4">
                <label className="text-[10px] uppercase text-gray-500 font-bold">
                  f(x)
                </label>
                <input
                  className="w-full p-1.5 border rounded text-sm font-mono disabled:bg-gray-100 disabled:text-gray-400"
                  value={pt.y}
                  onChange={(e) => updatePoint(idx, "y", e.target.value)}
                  placeholder="0"
                  disabled={pt.pos === "forbidden"}
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] uppercase text-gray-500 font-bold">
                  Position
                </label>
                <select
                  className="w-full p-1.5 border rounded text-sm bg-white"
                  value={pt.pos}
                  onChange={(e) => updatePoint(idx, "pos", e.target.value)}
                >
                  <option value="top">Haut (Max / +∞)</option>
                  <option value="bottom">Bas (Min / −∞)</option>
                  <option value="center">Milieu</option>
                  <option value="forbidden">Interdit (||)</option>
                </select>
              </div>
              <div className="w-8 flex justify-center mt-4">
                {safeContent.points.length > 2 && (
                  <button
                    onClick={() => removePoint(idx)}
                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={addPoint}
          className="mt-2 flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          <Plus size={16} /> Ajouter un point
        </button>
      </div>
    </div>
  );
};

export default VariationTableEditor;
