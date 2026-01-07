import React from 'react';

const SequenceEditor = ({ content, onUpdate }) => {
  // 1. INITIALISATION ROBUSTE (comme pour FunctionEditor)
  const safeContent = {
    name: 'u',
    type: 'explicit', // 'explicit' ou 'recursive'
    expression: '',
    firstTerm: '',
    firstTermIndex: '0',
    ...content // Écrase les défauts si le contenu existe
  };

  const updateContent = (field, value) => {
    onUpdate({ ...safeContent, [field]: value });
  };

  return (
    <div className="space-y-4">
      {/* Configuration Générale (Nom + Type) */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input 
            type="text"
            className="w-full p-2 border rounded font-mono text-center"
            value={safeContent.name}
            onChange={(e) => updateContent('name', e.target.value)}
            placeholder="u"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Type de définition</label>
          <select 
            className="w-full p-2 border rounded bg-white"
            value={safeContent.type}
            onChange={(e) => updateContent('type', e.target.value)}
          >
            <option value="explicit">Explicite (en fonction de n)</option>
            <option value="recursive">Récurrente (en fonction de Un)</option>
          </select>
        </div>
      </div>

      {/* Zone d'édition de la formule */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        
        {/* CAS 1 : SUITE EXPLICITE */}
        {safeContent.type === 'explicit' ? (
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Formule explicite
            </label>
            <div className="flex items-center gap-2">
              {/* Le label mathématique s'adapte au nom choisi */}
              <span className="font-mono text-lg whitespace-nowrap text-gray-800">
                {safeContent.name}_n =
              </span>
              <input 
                type="text"
                className="flex-1 p-2 border rounded font-mono"
                value={safeContent.expression}
                onChange={(e) => updateContent('expression', e.target.value)}
                placeholder="Ex: @a n + @b"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Utilisez <code>n</code> pour l'indice et <code>@a</code> pour les variables.
            </p>
          </div>
        ) : (
          /* CAS 2 : SUITE RÉCURRENTE */
          <div className="space-y-4">
            {/* Premier terme */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Premier terme
              </label>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg whitespace-nowrap text-gray-800">
                  {safeContent.name}_
                  <input
                    type="text"
                    className="w-8 p-0.5 border rounded text-center text-sm mx-0.5"
                    value={safeContent.firstTermIndex}
                    onChange={(e) => updateContent('firstTermIndex', e.target.value)}
                  />
                  =
                </span>
                <input 
                  type="text"
                  className="flex-1 p-2 border rounded font-mono"
                  value={safeContent.firstTerm}
                  onChange={(e) => updateContent('firstTerm', e.target.value)}
                  placeholder="Ex: @u0"
                />
              </div>
            </div>

            {/* Relation de récurrence */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Relation de récurrence
              </label>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg whitespace-nowrap text-gray-800">
                  {safeContent.name}_&#123;n+1&#125; =
                </span>
                <input 
                  type="text"
                  className="flex-1 p-2 border rounded font-mono"
                  value={safeContent.expression}
                  onChange={(e) => updateContent('expression', e.target.value)}
                  placeholder={`Ex: @q ${safeContent.name}_n + @r`}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Utilisez <code>{safeContent.name}_n</code> pour le terme précédent.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SequenceEditor;