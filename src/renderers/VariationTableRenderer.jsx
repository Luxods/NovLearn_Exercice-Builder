import React from "react";
import MathText from "../utils/mathRenderer";

const B = "2px solid #1f2937";

// Flèche SVG entre deux positions verticales (top / bottom / center)
const ArrowSVG = ({ fromPos, toPos }) => {
  const getY = (pos) => {
    if (pos === "top") return 8;
    if (pos === "bottom") return 92;
    return 50;
  };
  const y1 = getY(fromPos);
  const y2 = getY(toPos);
  const markerId = `arr-${fromPos}-${toPos}`;

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <marker
          id={markerId}
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#1f2937" />
        </marker>
      </defs>
      <line
        x1="8"
        y1={y1}
        x2="88"
        y2={y2}
        stroke="#1f2937"
        strokeWidth="2"
        markerEnd={`url(#${markerId})`}
      />
    </svg>
  );
};

const VariationTableRenderer = ({ content, variables }) => {
  const variable = content.variable ?? "x";
  const func = content.function ?? "f(x)";
  const points = content.points || [];

  const getValignClass = (pos) => {
    if (pos === "top") return "justify-start";
    if (pos === "bottom") return "justify-end";
    return "justify-center";
  };

  return (
    <div className="w-full overflow-x-auto my-2">
      {/*
        Même stratégie que SignTableRenderer :
        pas de border sur <table>, bordures manuelles sur chaque <td>.

        Ligne x   : borderTop + borderBottom + borderRight (header) + borderLeft (points i>0)
        Ligne f(x): borderBottom              + borderRight (header) + borderLeft (points non-forbidden i>0)
      */}
      <table className="border-collapse mx-auto text-base">
        <tbody>
          {/* ── LIGNE x ─────────────────────────────────────── */}
          <tr>
            <td
              className="px-3 py-1.5 font-bold text-center bg-gray-50 min-w-[52px]"
              style={{ borderTop: B, borderBottom: B, borderRight: B }}
            >
              <MathText content={`$${variable}$`} variables={variables} />
            </td>

            {points.map((pt, i) => (
              <React.Fragment key={i}>
                <td
                  className="px-4 py-1.5 text-center min-w-[40px]"
                  style={{
                    borderTop: B,
                    borderBottom: B,
                    ...(i > 0 ? { borderLeft: B } : {}),
                  }}
                >
                  <MathText content={`$${pt.x}$`} variables={variables} />
                </td>
                {i < points.length - 1 && (
                  <td
                    className="min-w-[72px] md:min-w-[96px]"
                    style={{ borderTop: B, borderBottom: B }}
                  />
                )}
              </React.Fragment>
            ))}
          </tr>

          {/* ── LIGNE f(x) avec valeurs et flèches ──────────── */}
          <tr>
            <td
              className="px-3 py-2 font-bold text-center bg-gray-50 h-28 md:h-32"
              style={{ borderBottom: B, borderRight: B }}
            >
              <MathText content={`$${func}$`} variables={variables} />
            </td>

            {points.map((pt, i) => {
              const isForbidden = pt.pos === "forbidden";
              return (
                <React.Fragment key={i}>
                  {/*
                    Valeur f(x) :
                    - forbidden : "||" pleine hauteur, SANS borderLeft
                    - autres    : valeur positionnée haut/bas/milieu
                  */}
                  <td
                    className="relative h-28 md:h-32"
                    style={{
                      borderBottom: B,
                      ...(i > 0 && !isForbidden ? { borderLeft: B } : {}),
                    }}
                  >
                    {isForbidden ? (
                      <span className="absolute inset-0 flex gap-[4px] justify-center items-stretch py-[3px]">
                        <span className="block w-[2px] bg-gray-900" />
                        <span className="block w-[2px] bg-gray-900" />
                      </span>
                    ) : (
                      <div
                        className={`absolute inset-0 flex flex-col items-center py-2 ${getValignClass(pt.pos)}`}
                      >
                        <span className="relative z-10 bg-white px-1 leading-none">
                          <MathText
                            content={`$${pt.y}$`}
                            variables={variables}
                          />
                        </span>
                      </div>
                    )}
                  </td>

                  {/* Flèche dans l'intervalle — absente si un bord est forbidden */}
                  {i < points.length - 1 && (
                    <td
                      className="relative h-28 md:h-32 min-w-[72px] md:min-w-[96px]"
                      style={{ borderBottom: B }}
                    >
                      {!isForbidden && points[i + 1]?.pos !== "forbidden" && (
                        <ArrowSVG fromPos={pt.pos} toPos={points[i + 1].pos} />
                      )}
                    </td>
                  )}
                </React.Fragment>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VariationTableRenderer;
