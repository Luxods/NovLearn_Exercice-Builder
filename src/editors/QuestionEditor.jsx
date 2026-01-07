import React from 'react';

const QuestionEditor = ({ content, onUpdate }) => {
  const safeContent = content || {
    question: '',
    answerType: 'number', // 'number', 'expression'
    answer: '',
    points: 1
  };

  const updateContent = (field, value) => {
    onUpdate({ ...safeContent, [field]: value });
  };

  return (
    <div className="space-y-4">
      {/* Énoncé de la question */}
      <div>
        <label className="block text-sm font-medium mb-1">Question</label>
        <textarea
          className="w-full p-2 border rounded font-mono text-sm"
          rows={2}
          value={safeContent.question || ''}
          onChange={(e) => updateContent('question', e.target.value)}
          placeholder="Calculer l'image de @a..."
        />
      </div>

      {/* Paramètres de réponse */}
      <div className="grid grid-cols-2 gap-4 bg-blue-50 p-3 rounded">
        <div>
          <label className="block text-xs font-medium text-blue-800 mb-1">Type de réponse</label>
          <select
            className="w-full p-1 border rounded text-sm"
            value={safeContent.answerType}
            onChange={(e) => updateContent('answerType', e.target.value)}
          >
            <option value="number">Nombre exact</option>
            <option value="expression">Expression mathématique</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-blue-800 mb-1">Points</label>
          <input
            type="number"
            className="w-full p-1 border rounded text-sm"
            value={safeContent.points}
            onChange={(e) => updateContent('points', parseInt(e.target.value) || 1)}
          />
        </div>
        
        <div className="col-span-2">
          <label className="block text-xs font-medium text-blue-800 mb-1">
            Réponse attendue (calculée)
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded font-mono text-sm"
            value={safeContent.answer || ''}
            onChange={(e) => updateContent('answer', e.target.value)}
            placeholder={safeContent.answerType === 'number' ? "Ex: @a * @b" : "Ex: 2x + @a"}
          />
          <p className="text-[10px] text-blue-600 mt-1">
            Utilisez les variables <code>@a</code>. Pour les nombres, ce champ sera évalué.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;