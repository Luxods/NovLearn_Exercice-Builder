import { ArrowRight, Plus, Trash2 } from "lucide-react";

const SignTableEditor = ({ content, onUpdate }) => {
  const safeContent = {
    headers: ["x", "f(x)"],
    points: content?.points || [
      { x: "-\\infty", type: "boundary", signAfter: "+" },
      { x: "x_1", type: "zero", signAfter: "-" },
      { x: "+\\infty", type: "boundary", signAfter: null },
    ],
    ...content,
  };

  const updatePoint = (index, field, value) => {
    const newPoints = [...safeContent.points];
    newPoints[index] = { ...newPoints[index], [field]: value };
    onUpdate({ ...safeContent, points: newPoints });
  };

  const addPoint = () => {
    const newPoints = [...safeContent.points];
    // On insère le point juste avant le dernier (généralement +infini)
    const last = newPoints.pop();
    newPoints.push({ x: "", type: "zero", signAfter: "+" });
    newPoints.push(last);
    onUpdate({ ...safeContent, points: newPoints });
  };

  const removePoint = (index) => {
    const newPoints = safeContent.points.filter((_, i) => i !== index);
    onUpdate({ ...safeContent, points: newPoints });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">
            Titre Ligne 1
          </label>
          <input
            className="w-full p-1.5 border rounded text-sm font-mono"
            value={safeContent.headers[0]}
            onChange={(e) =>
              onUpdate({
                ...safeContent,
                headers: [e.target.value, safeContent.headers[1]],
              })
            }
          />
        </div>
        <div className="w-1/2">
          <label className="block text-[10px] text-gray-500 font-bold uppercase mb-1">
            Titre Ligne 2
          </label>
          <input
            className="w-full p-1.5 border rounded text-sm font-mono"
            value={safeContent.headers[1]}
            onChange={(e) =>
              onUpdate({
                ...safeContent,
                headers: [safeContent.headers[0], e.target.value],
              })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        {safeContent.points.map((pt, idx) => {
          const isLast = idx === safeContent.points.length - 1;
          return (
            <div
              key={idx}
              className="flex gap-2 items-center bg-gray-50 p-2 rounded border border-gray-200"
            >
              <div className="w-1/3">
                <label className="text-[10px] text-gray-500 uppercase font-bold">
                  Valeur de x
                </label>
                <input
                  className="w-full p-1.5 border rounded font-mono text-sm"
                  value={pt.x}
                  onChange={(e) => updatePoint(idx, "x", e.target.value)}
                  placeholder="@x1"
                />
              </div>

              <div className="w-1/4">
                <label className="text-[10px] text-gray-500 uppercase font-bold">
                  Sous le x
                </label>
                <select
                  className="w-full p-1.5 border rounded text-sm bg-white"
                  value={pt.type}
                  onChange={(e) => updatePoint(idx, "type", e.target.value)}
                >
                  <option value="boundary">Borne</option>
                  <option value="zero">Zéro (0)</option>
                  <option value="forbidden">Interdit (||)</option>
                </select>
              </div>

              {!isLast ? (
                <div className="w-1/4 flex items-center gap-2">
                  <ArrowRight
                    size={14}
                    className="text-gray-400 mt-4 shrink-0"
                  />
                  <div className="w-full">
                    <label className="text-[10px] text-blue-500 uppercase font-bold">
                      Signe
                    </label>
                    <select
                      className="w-full p-1.5 border border-blue-300 bg-blue-50 rounded text-sm font-bold text-center text-blue-700"
                      value={pt.signAfter ?? pt.signNext ?? "+"}
                      onChange={(e) =>
                        updatePoint(idx, "signAfter", e.target.value)
                      }
                    >
                      <option value="+">+</option>
                      <option value="-">-</option>
                      <option value="?">?</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="w-1/4 mt-4 text-center text-xs text-gray-400 italic">
                  Fin
                </div>
              )}

              <div className="w-8 flex justify-center mt-4">
                {idx !== 0 && !isLast && (
                  <button
                    onClick={() => removePoint(idx)}
                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={addPoint}
        className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        <Plus size={16} /> Ajouter un point
      </button>
    </div>
  );
};

export default SignTableEditor;
