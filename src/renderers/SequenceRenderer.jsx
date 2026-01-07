import React from 'react';
import MathText from '../utils/mathRenderer';

const SequenceRenderer = ({ content, variables }) => {
  // Sécurisation des valeurs par défaut
  const safeContent = {
    name: 'u',
    type: 'explicit',
    expression: '',
    firstTerm: '',
    firstTermIndex: '0',
    ...content
  };

  const { name, type, expression, firstTerm, firstTermIndex } = safeContent;

  // Construction de la chaîne LaTeX pour l'affichage
  let latexDisplay = '';

  if (type === 'explicit') {
    // Mode explicite : u_n = ...
    // On met des accolades {name} pour gérer les noms longs ex: u_n ou Cost_n
    latexDisplay = `$$ ${name}_n = ${expression} $$`;
  } else {
    // Mode récurrent : Système
    // u_{0} = ...
    // u_{n+1} = ...
    latexDisplay = `$$ \\begin{cases} ${name}_{${firstTermIndex}} = ${firstTerm} \\\\ ${name}_{n+1} = ${expression} \\end{cases} $$`;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="bg-emerald-50/50 rounded-lg p-6 flex justify-center items-center overflow-x-auto">
        <MathText
          content={latexDisplay}
          variables={variables}
          className="text-xl text-gray-800"
          displayMode={true}
        />
      </div>
      
      {/* Petit label discret pour indiquer le type */}
      <div className="mt-2 text-center text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
        Suite {type === 'explicit' ? 'Explicite' : 'Récurrente'}
      </div>
    </div>
  );
};

export default SequenceRenderer;