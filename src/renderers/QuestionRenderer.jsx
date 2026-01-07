import React, { useState } from 'react';
import MathText from '../utils/mathRenderer';
import { HelpCircle } from 'lucide-react';

const QuestionRenderer = ({ content, variables }) => {
  const { 
    question, 
    answerFormat = 'text', 
    points = 1,
    correctAnswer 
  } = content;

  // 1. Préfixe pour l'élève (S=, x appartient...)
  const getPrefix = () => {
    switch (answerFormat) {
      case 'equation': return 'S =';
      case 'interval': return 'x \\in';
      case 'expression': return ''; 
      default: return '';
    }
  };

  // 2. Placeholder intelligent
  const getPlaceholder = () => {
    switch (answerFormat) {
      case 'equation': return '{ ... }'; // L'élève doit mettre les accolades ou juste les nombres selon ta consigne
      case 'interval': return '] ... ; ... [';
      case 'expression': return 'f\'(x)...';
      default: return 'Votre réponse...';
    }
  };

  // 3. FONCTION MAGIQUE : Formate la solution prof pour l'affichage beau gosse
  const getFormattedSolution = () => {
    if (!correctAnswer) return '';
    
    let sol = correctAnswer;

    // Remplacement des mots-clés simplifiés
    sol = sol.replace(/\bvide\b/g, '\\emptyset');
    sol = sol.replace(/\binf\b/g, '\\infty');
    sol = sol.replace(/\bU\b/g, '\\cup');

    // Mise en forme selon le type
    if (answerFormat === 'equation') {
        // Si ce n'est pas l'ensemble vide, on ajoute les accolades si elles manquent
        if (!sol.includes('\\emptyset') && !sol.trim().startsWith('\\{')) {
            sol = `\\{ ${sol} \\}`;
        }
    }

    return sol;
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-100">
      
      {/* En-tête */}
      <div className="flex justify-between items-start mb-4">
        <div className="text-lg text-gray-800 font-medium leading-relaxed">
          <MathText content={question} variables={variables} />
        </div>
        <div className="flex-shrink-0 ml-4 px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-500">
          {points} pt{points > 1 ? 's' : ''}
        </div>
      </div>

      {/* Zone Réponse Élève */}
      <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-3">
        {getPrefix() && (
          <div className="text-gray-700 font-bold text-lg">
            <MathText content={`$${getPrefix()}$`} />
          </div>
        )}
        <div className="flex-1">
          <input 
             type="text" 
             className="w-full p-2 border-2 border-dashed border-gray-300 rounded bg-white"
             placeholder={getPlaceholder()}
             disabled // Désactivé en mode éditeur
          />
        </div>
      </div>

      {/* Solution (Visible Prof) */}
      {correctAnswer && (
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-start gap-2 animate-in fade-in">
          <div className="p-1 bg-green-100 text-green-600 rounded">
            <HelpCircle size={14} />
          </div>
          <div>
            <span className="text-xs font-bold text-green-700 uppercase">Solution attendue :</span>
            <div className="text-sm text-gray-700 font-medium mt-1 px-2 py-1 bg-green-50 rounded border border-green-100 inline-block">
               {/* On affiche la solution formatée proprement */}
               <MathText content={`$${getFormattedSolution()}$`} variables={variables} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionRenderer;