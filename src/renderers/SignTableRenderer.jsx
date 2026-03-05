import React from "react";
import MathText from "../utils/mathRenderer";

const SignTableRenderer = ({ content, variables }) => {
  const headers = content.headers || ["x", "f(x)"];
  const points = content.points || [];

  return (
    <div className="w-full overflow-x-auto my-2">
      <table className="border-collapse border-2 border-gray-800 text-sm md:text-base mx-auto">
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

          {/* LIGNE DES SIGNES */}
          <tr>
            <td className="px-3 py-2 border-r-2 border-gray-800 bg-gray-50 font-bold text-center">
              <MathText content={`$${headers[1]}$`} variables={variables} />
            </td>
            {points.map((pt, i) => (
              <React.Fragment key={`sign-${i}`}>
                <td
                  className={`py-3 h-10 text-center${i > 0 ? " border-l-2 border-gray-800" : ""}`}
                >
                  {pt.type === "zero" && (
                    <span className="font-bold text-gray-800">0</span>
                  )}
                  {pt.type === "forbidden" && (
                    <span className="inline-flex gap-[3px]">
                      <span className="block w-[3px] h-6 bg-gray-800 rounded-sm" />
                      <span className="block w-[3px] h-6 bg-gray-800 rounded-sm" />
                    </span>
                  )}
                </td>
                {i < points.length - 1 && (
                  <td className="py-3 text-center font-bold text-xl text-gray-800">
                    {pt.signAfter ?? pt.signNext}
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

export default SignTableRenderer;
