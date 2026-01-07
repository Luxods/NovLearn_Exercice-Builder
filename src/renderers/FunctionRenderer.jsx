import React from 'react';
import MathText from '../utils/mathRenderer';

const FunctionRenderer = ({ content, variables }) => {
  const name = content.name || 'f';
  // On construit la chaîne LaTeX complète : f(x) = expression
  // Le MathText s'occupera de remplacer les @variables dans l'expression
  const fullExpression = `$$ ${name}(x) = ${content.expression || ''} $$`;

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="bg-blue-50/50 rounded-lg p-6 flex flex-col items-center justify-center gap-2 overflow-x-auto">
        <MathText
          content={fullExpression}
          variables={variables}
          className="text-xl text-gray-800"
          displayMode={true}
        />
        
        {content.definitionSet && (
          <div className="text-sm text-gray-500 mt-2">
            <MathText 
              content={`$x \\in ${content.definitionSet}$`} 
              variables={variables}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FunctionRenderer;