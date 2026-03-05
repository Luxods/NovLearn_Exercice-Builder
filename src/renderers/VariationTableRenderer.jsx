import React from "react";
import MathText from "../utils/mathRenderer";

// Composant SVG pour la flèche entre deux valeurs
// fromPos / toPos : 'top' | 'bottom' | 'center'
const ArrowSVG = ({ fromPos, toPos }) => {
  const y1 = fromPos === "top" ? 12 : fromPos === "bottom" ? 88 : 50;
  const y2 = toPos === "top" ? 12 : toPos === "bottom" ? 88 : 50;
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <marker
          id="arr-vt"
          markerWidth="6"
          markerHeight="4"
          refX="5"
          refY="2"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <polygon points="0 0, 6 2, 0 4" fill="#374151" />
        </marker>
      </defs>
      <line
        x1="8"
        y1={y1}
        x2="88"
        y2={y2}
        stroke="#374151"
        strokeWidth="1.5"
        markerEnd="url(#arr-vt)"
      />
    </svg>
  );
};

const VariationTableRenderer = ({ content, variables }) => {
  const headers = content.headers || ["x", "f(x)"];
  const points = content.points || [];

  // Aligne la valeur f(x) en haut, en bas ou au centre de la cellule
  const getValignClass = (pos) => {
    if (pos === "top") return "justify-start";
    if (pos === "bottom") return "justify-end";
    return "justify-center";
  };

  return (
    <div className="w-full overflow-x-auto my-2">
      <table className="border-collapse border-2 border-gray-800 text-sm md:text-base mx-auto w-full">
        <tbody>
          {/* LIGNE DES X */}
          <tr className="border-b-2 border-gray-800">
            <td className="px-3 py-2 border-r-2 border-gray-800 bg-gray-50 font-bold text-center min-w-[56px]">
              <MathText content={`$${headers[0]}$`} variables={variables} />
            </td>
            {points.map((pt, i) => (
              <React.Fragment key={`x-${i}`}>
                <td
                  className={`px-4 py-2 text-center min-w-[40px]${i > 0 ? " border-l-2 border-gray-800" : ""}`}
                >
                  <MathText content={`$${pt.x}$`} variables={variables} />
                </td>
                {i < points.length - 1 && (
                  <td className="min-w-[60px] md:min-w-[80px]" />
                )}
              </React.Fragment>
            ))}
          </tr>

          {/* LIGNE DES VARIATIONS f(x) */}
          <tr>
            <td className="px-3 py-2 border-r-2 border-gray-800 bg-gray-50 font-bold text-center h-24 md:h-32">
              <MathText content={`$${headers[1]}$`} variables={variables} />
            </td>
            {points.map((pt, i) => (
              <React.Fragment key={`fx-${i}`}>
                {/* Valeur de f(x) positionnée verticalement */}
                <td
                  className={`relative h-24 md:h-32${i > 0 ? " border-l-2 border-gray-800" : ""}`}
                >
                  <div
                    className={`absolute inset-0 flex flex-col items-center py-2 ${getValignClass(pt.pos)}`}
                  >
                    {pt.pos === "forbidden" ? (
                      <span className="inline-flex gap-[3px]">
                        <span className="block w-[3px] h-8 bg-gray-800 rounded-sm" />
                        <span className="block w-[3px] h-8 bg-gray-800 rounded-sm" />
                      </span>
                    ) : (
                      <span className="relative z-10 bg-white px-1">
                        <MathText content={`$${pt.y}$`} variables={variables} />
                      </span>
                    )}
                  </div>
                </td>
                {/* Flèche dans l'intervalle entre deux points */}
                {i < points.length - 1 && (
                  <td className="relative h-24 md:h-32 min-w-[60px] md:min-w-[80px]">
                    {pt.pos !== "forbidden" &&
                      points[i + 1].pos !== "forbidden" && (
                        <ArrowSVG fromPos={pt.pos} toPos={points[i + 1].pos} />
                      )}
                  </td>
                )}
              </React.Fragment>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VariationTableRenderer;
