import React from 'react';
import MathText from '../utils/mathRenderer';

const VariationTableRenderer = ({ content, variables }) => {
  const headers = content.headers || ["x", "f(x)"];
  const columns = content.columns || [];

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
      <div className="inline-block min-w-full border border-gray-800 rounded">
        {/* Ligne X */}
        <div className="flex border-b border-gray-800">
          <div className="w-16 p-2 border-r border-gray-800 flex items-center justify-center bg-gray-50 font-bold">
            <MathText content={`$${headers[0]}$`} variables={variables} />
          </div>
          <div className="flex-1 flex justify-between px-8 py-2">
            {columns.map((col, i) => (
              <div key={i} className="text-center w-12">
                <MathText content={`$${col.x}$`} variables={variables} />
              </div>
            ))}
          </div>
        </div>

        {/* Ligne f(x) */}
        <div className="flex h-32">
          <div className="w-16 border-r border-gray-800 flex items-center justify-center bg-gray-50 font-bold">
            <MathText content={`$${headers[1]}$`} variables={variables} />
          </div>
          
          <div className="flex-1 flex justify-between px-8 py-4 relative">
            {/* Traits de variation (Simplifié : flèches CSS à améliorer si besoin) */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
               {/* Ici on pourrait tracer des SVG, pour l'instant on laisse vide pour la clarté */}
            </div>

            {columns.map((col, i) => {
              // Positionnement vertical flex
              let align = "items-center";
              if (col.variation === 'high') align = "items-start";
              if (col.variation === 'low') align = "items-end";

              return (
                <div key={i} className={`flex flex-col ${align} justify-center w-12 h-full`}>
                   {col.val && (
                     <div className="font-bold">
                       <MathText content={`$${col.val}$`} variables={variables} />
                     </div>
                   )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariationTableRenderer;