import React from 'react';
import MathText from '../utils/mathRenderer';

const QuestionRenderer = ({ content, variables }) => {
  return (
    <div className="flex gap-4 items-start py-2">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
        ?
      </div>
      <div className="flex-1 pt-0.5">
        <div className="font-medium text-gray-900">
          <MathText content={content.question} variables={variables} />
        </div>
        {/* En mode édition/preview, on n'affiche pas le champ réponse interactif, juste un placeholder visuel */}
        <div className="mt-3">
          <div className="w-full max-w-xs h-10 border-2 border-dashed border-gray-300 rounded bg-gray-50 flex items-center px-3 text-gray-400 text-sm">
            Zone de réponse élève
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionRenderer;