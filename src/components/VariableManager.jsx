import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const VariableManager = ({ currentExercise, generatedValues, addVariable, updateVariable, deleteVariable }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">🎲 Variables aléatoires</h2>
        <button
          onClick={addVariable}
          className="flex items-center gap-1 px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm"
        >
          <Plus size={16} />
          Variable
        </button>
      </div>

      {currentExercise.variables.length === 0 ? (
        <p className="text-gray-400 text-center py-4 bg-gray-50 rounded-lg">
          Ajoutez des variables pour créer des exercices infinis (a, b, c...)
        </p>
      ) : (
        <div className="space-y-3">
          {currentExercise.variables.map((variable) => (
            <div key={variable.id} className="border-2 border-purple-200 rounded-lg p-3 bg-purple-50">
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="text"
                  className="w-20 p-1 border rounded"
                  value={variable.name}
                  onChange={(e) => updateVariable(variable.id, { name: e.target.value })}
                  placeholder="a"
                />
                <select
                  className="p-1 border rounded"
                  value={variable.type}
                  onChange={(e) => updateVariable(variable.id, { type: e.target.value })}
                >
                  <option value="integer">Entier</option>
                  <option value="decimal">Décimal</option>
                  <option value="choice">Choix</option>
                  <option value="computed">Fonction des autres</option> {/* Nouvelle option */}
                </select>
                <button
                  onClick={() => deleteVariable(variable.id)}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Affichage conditionnel selon le type */}
              {variable.type === 'computed' ? (
                <div className="mt-2 w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 font-mono text-sm font-bold">=</span>
                    <input
                      type="text"
                      className="flex-1 p-1 border rounded font-mono text-sm bg-white border-purple-300"
                      placeholder="Ex: 2*a + b^2"
                      value={variable.expression || ''}
                      onChange={(e) => updateVariable(variable.id, { expression: e.target.value })}
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1 ml-4">
                    Utilisez les noms des autres variables (ex: a, b). Opérateurs: +, -, *, /, ^, sqrt()...
                  </p>
                </div>
              ) : variable.type === 'integer' || variable.type === 'decimal' ? (
                <div className="flex gap-2">
                  <p>Min :</p>
                  <input
                    type="number"
                    className="flex-1 p-1 border rounded"
                    placeholder="Min"
                    value={variable.min ?? ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateVariable(variable.id, { 
                        min: value === '' ? null : parseFloat(value) 
                      });
                    }}
                  />
                  <p>Max :</p>
                  <input
                    type="number"
                    className="flex-1 p-1 border rounded"
                    placeholder="Max"
                    value={variable.max}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateVariable(variable.id, { 
                        max: value === '' ? null : parseFloat(value) 
                      });
                    }}
                  />
                  {variable.type === 'decimal' && (
                    <input
                      type="number"
                      className="w-20 p-1 border rounded"
                      placeholder="Déc."
                      value={variable.decimals}
                      onChange={(e) => updateVariable(variable.id, { decimals: parseInt(e.target.value) })}
                    />
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  className="w-full p-1 border rounded"
                  placeholder="Valeurs séparées par des virgules: sin,cos,tan"
                  value={variable.choices ? variable.choices.join(',') : ''}
                  onChange={(e) => updateVariable(variable.id, { 
                    choices: e.target.value.split(',').map(s => s.trim()) 
                  })}
                />
              )}
              
              {generatedValues[variable.name] !== undefined && (
                <div className="mt-2 text-sm text-purple-700 font-medium border-t border-purple-100 pt-1">
                  Valeur actuelle: <strong>{generatedValues[variable.name]}</strong>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VariableManager;