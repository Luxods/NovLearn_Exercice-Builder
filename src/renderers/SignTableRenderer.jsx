import React from "react";
import MathText from "../utils/mathRenderer";

const B = "2px solid #1f2937";

const SignTableRenderer = ({ content, variables }) => {
  const variable = content.variable ?? "x";
  const func = content.function ?? "f(x)";
  const points = content.points || [];
  const signs = content.signs || [];

  return (
    <div className="w-full overflow-x-auto my-2">
      {/*
        Pas de border sur <table> — on dessine les bordures
        manuellement sur chaque <td> pour éviter que border-collapse
        "encadre" les cellules d'intervalle.

        Structure des bordures :
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

          {/* ── LIGNE des signes ─────────────────────────────── */}
          <tr>
            <td
              className="px-3 py-2 font-bold text-center bg-gray-50"
              style={{ borderBottom: B, borderRight: B }}
            >
              <MathText content={`$${func}$`} variables={variables} />
            </td>

            {points.map((pt, i) => {
              const isForbidden = pt.type === "forbidden";
              return (
                <React.Fragment key={i}>
                  {/*
                    Point remarquable :
                    - boundary : rien (juste le séparateur vertical)
                    - zero     : affiche "0" centré, avec le séparateur
                    - forbidden: affiche "||" pleine hauteur, SANS borderLeft
                                 (les doubles barres remplacent le séparateur)
                  */}
                  <td
                    className="h-12 text-center relative"
                    style={{
                      borderBottom: B,
                      ...(i > 0 && !isForbidden ? { borderLeft: B } : {}),
                    }}
                  >
                    {pt.type === "zero" && (
                      <span className="font-bold text-gray-900 text-base">
                        0
                      </span>
                    )}
                    {isForbidden && (
                      <span className="absolute inset-0 flex gap-[4px] justify-center items-stretch py-[3px]">
                        <span className="block w-[2px] bg-gray-900" />
                        <span className="block w-[2px] bg-gray-900" />
                      </span>
                    )}
                  </td>

                  {/* Signe dans l'intervalle */}
                  {i < points.length - 1 && (
                    <td
                      className="h-12 text-center font-bold text-xl select-none"
                      style={{ borderBottom: B }}
                    >
                      {signs[i] === "?" ? (
                        <span className="text-gray-400 text-base font-normal">
                          ?
                        </span>
                      ) : (
                        <span className="text-gray-900">{signs[i]}</span>
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

export default SignTableRenderer;
