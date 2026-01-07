import React from 'react';
import MathText from '../utils/mathRenderer';

const SignTableRenderer = ({ content, variables }) => {
  const headers = content.headers || ["x", "f(x)"];
  const intervals = content.intervals || [];

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
      <table className="w-full border-collapse border border-gray-800">
        <tbody>
          {/* Ligne X */}
          <tr className="border-b border-gray-800">
            <td className="w-16 p-2 border-r border-gray-800 text-center bg-gray-50 font-bold">
               <MathText content={`$${headers[0]}$`} variables={variables} />
            </td>
            {intervals.map((item, i) => (
              <td key={i} className="p-2 text-center relative min-w-[60px]">
                 {/* Si ce n'est pas le dernier, on affiche la borne */}
                 <MathText content={`$${item.val}$`} variables={variables} />
              </td>
            ))}
          </tr>
          {/* Ligne Signes */}
          <tr>
            <td className="p-2 border-r border-gray-800 text-center bg-gray-50 font-bold">
               <MathText content={`$${headers[1]}$`} variables={variables} />
            </td>
            {intervals.map((item, i) => (
              <td key={i} className="p-2 text-center relative border-l border-dashed border-gray-300 first:border-l-0">
                {/* Logique d'affichage des signes et zéros */}
                {item.sign === '0' ? (
                   <div className="relative inline-block w-full">
                     <div className="absolute top-0 bottom-0 left-1/2 w-px bg-black -translate-x-1/2 h-full -mt-2 -mb-2"></div>
                     <span className="relative z-10 bg-white px-1">0</span>
                   </div>
                ) : item.sign === 'z' ? (
                   <div className="h-full w-full flex justify-center gap-1">
                     <div className="w-px bg-black h-8"></div>
                     <div className="w-px bg-black h-8"></div>
                   </div>
                ) : (
                   <span className="font-bold text-lg">{item.sign}</span>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default SignTableRenderer;