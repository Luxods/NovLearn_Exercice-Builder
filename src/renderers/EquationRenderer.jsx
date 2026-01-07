import React from 'react';
import MathText from '../utils/mathRenderer';

const EquationRenderer = ({ content, variables }) => {
  // Déterminer quel contenu afficher selon le type
  const getDisplayContent = () => {
    if (content.type === 'system' && content.system) {
      // Si c'est un système, on s'assure qu'il est bien formaté
      // S'il ne contient pas déjà des $, on considère que c'est un bloc math display
      return content.system.includes('$') ? content.system : `$$${content.system}$$`;
    }
    // Par défaut (simple)
    return content.latex ? `$$${content.latex}$$` : '';
  };

  const displayContent = getDisplayContent();

  if (!displayContent) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="bg-blue-50/50 rounded-lg p-6 flex justify-center items-center overflow-x-auto">
        <MathText
          content={displayContent}
          variables={variables}
          className="text-lg text-gray-800"
          displayMode={true}
        />
      </div>
    </div>
  );
};

export default EquationRenderer;