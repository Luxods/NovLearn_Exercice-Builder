import React from 'react';

const FunctionEditor = ({ content, onUpdate }) => {
  // CORRECTION 1 : Fusion robuste pour garantir que 'f' est là même si content est {}
  const safeContent = {
    name: 'f',
    expression: '',
    definitionSet: '\\mathbb{R}',
    ...content // On écrase les défauts par le contenu réel s'il existe
  };

  const updateContent = (field, value) => {
    onUpdate({ ...safeContent, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input 
            type="text"
            className="w-full p-2 border rounded font-mono text-center"
            value={safeContent.name}
            onChange={(e) => updateContent('name', e.target.value)}
            placeholder="f"
          />
        </div>
        
        <div className="col-span-3">
          <label className="block text-sm font-medium mb-1">Ensemble de définition</label>
          <input 
            type="text"
            className="w-full p-2 border rounded font-mono"
            value={safeContent.definitionSet}
            onChange={(e) => updateContent('definitionSet', e.target.value)}
            placeholder="\mathbb{R}"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Expression de la fonction (LaTeX)
        </label>
        
        {/* CORRECTION 2 : Layout Flexbox corrigé */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-gray-700 text-lg whitespace-nowrap">
            {safeContent.name}(x) =
          </span>
          <input 
            type="text"
            // Utiliser flex-1 au lieu de w-full pour qu'il prenne juste la place restante
            className="flex-1 p-2 border rounded font-mono" 
            value={safeContent.expression}
            onChange={(e) => updateContent('expression', e.target.value)}
            placeholder="Ex: @a*x^2 + @b"
          />
        </div>
        
        <p className="text-xs text-gray-500 mt-1">
          Utilisez <code>@variable</code> pour les valeurs dynamiques (ex: <code>@a</code>).
          L'expression sera automatiquement simplifiée.
        </p>
      </div>
    </div>
  );
};

export default FunctionEditor;