import React, { useState } from 'react';
import { Plus, Trash2, AlertCircle, Calculator, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { moduleHelpCategories } from '../utils/mathmodules';

const VariableManager = ({ currentExercise, generatedValues, addVariable, updateVariable, deleteVariable }) => {
  const [showFuncHelp, setShowFuncHelp] = useState(false);

  // Fonction pour gérer la saisie des nombres (permet "-" et les décimales)
  const handleNumberChange = (id, field, value) => {
    // 1. Si c'est vide ou juste un "-", on garde la chaîne pour permettre la frappe
    if (value === '' || value === '-') {
      updateVariable(id, { [field]: value });
      return;
    }

    // 2. On essaie de convertir
    const num = parseFloat(value);

    // 3. Si c'est un nombre valide ET qu'il n'y a pas de formatage en cours (ex: "5." ou "0.0")
    // On sauvegarde le Nombre (pour que les maths fonctionnent), sinon la chaîne.
    if (!isNaN(num) && String(num) === value) {
      updateVariable(id, { [field]: num });
    } else {
      updateVariable(id, { [field]: value });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">🎲 Variables aléatoires</h2>
        <div className="flex gap-2">
           <button
            onClick={() => setShowFuncHelp(!showFuncHelp)}
            className={`flex items-center gap-1 px-3 py-1 border rounded-lg text-sm transition-colors font-medium ${showFuncHelp ? 'bg-blue-500 text-white border-blue-600 shadow-inner' : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-600'}`}
          >
            <Calculator size={16} />
            {showFuncHelp ? 'Masquer Aide' : 'Fonctions'}
          </button>
          <button
            onClick={addVariable}
            className="flex items-center gap-1 px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm font-medium shadow-sm"
          >
            <Plus size={16} />
            Variable
          </button>
        </div>
      </div>

      {/* --- AIDE AUX FONCTIONS --- */}
      {showFuncHelp && (
        <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex justify-between items-center mb-4">
             <h4 className="font-bold text-gray-800 flex items-center gap-2">
               <Calculator size={18} className="text-blue-600"/>
               Bibliothèque de Fonctions
             </h4>
             <span className="text-xs text-gray-400 italic">Cliquez sur une formule pour copier</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {moduleHelpCategories.map((cat, idx) => (
              <div key={idx} className={`rounded-lg border overflow-hidden ${cat.color.replace('text-', 'border-').split(' ')[2]}`}>
                <div className={`px-3 py-2 text-xs font-bold uppercase tracking-wider ${cat.color}`}>
                  {cat.title}
                </div>
                <div className="p-2 bg-white space-y-1">
                  {cat.funcs.map((fn, fIdx) => (
                    <div 
                      key={fIdx} 
                      className="group flex items-center justify-between p-1.5 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                      title="Copier"
                      onClick={() => {
                        navigator.clipboard.writeText(fn.syntax);
                      }}
                    >
                      <div className="flex flex-col">
                        <code className="text-xs font-bold text-gray-700 font-mono group-hover:text-blue-600">
                          {fn.syntax}
                        </code>
                        <span className="text-[10px] text-gray-400">{fn.desc}</span>
                      </div>
                      <Copy size={12} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded text-xs text-yellow-800 flex gap-2">
            <span className="font-bold">💡 Note :</span>
            <p>
              Pour les fonctions <code>solve</code> et <code>derive</code>, mettez l'expression entre guillemets. 
              <br/>Exemple : <code>solve("(x+1)/(x^2+3)", 0)</code>
            </p>
          </div>
        </div>
      )}

      {/* --- LISTE DES VARIABLES --- */}
      {currentExercise.variables.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-500 mb-2">
            <Plus size={24} />
          </div>
          <p className="text-gray-500 font-medium">Aucune variable définie</p>
          <p className="text-sm text-gray-400">Créez des variables (a, b...) pour rendre l'exercice dynamique.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {currentExercise.variables.map((variable) => (
            <div key={variable.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group">
              
              <div className="flex items-center gap-2 mb-2">
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">@</span>
                  <input
                    type="text"
                    className="w-16 pl-5 pr-1 py-1 border rounded text-sm font-bold bg-white focus:ring-2 focus:ring-purple-200 outline-none"
                    value={variable.name}
                    onChange={(e) => updateVariable(variable.id, { name: e.target.value })}
                    placeholder="a"
                  />
                </div>
                <select
                  className="p-1 py-1.5 border rounded text-sm bg-white focus:ring-2 focus:ring-purple-200 outline-none cursor-pointer"
                  value={variable.type}
                  onChange={(e) => updateVariable(variable.id, { type: e.target.value })}
                >
                  <option value="integer">Entier</option>
                  <option value="decimal">Décimal</option>
                  <option value="choice">Choix</option>
                  <option value="computed">Calculé (fct)</option>
                </select>
                <button
                  onClick={() => deleteVariable(variable.id)}
                  className="ml-auto p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {variable.type === 'computed' ? (
                <div className="mt-2 w-full">
                  <div className="flex items-center gap-2 relative">
                    <span className="text-gray-400 font-mono text-lg">=</span>
                    <input
                      type="text"
                      className="flex-1 p-1.5 border rounded font-mono text-sm bg-white border-blue-200 text-blue-800 placeholder-blue-200 focus:ring-2 focus:ring-blue-100 outline-none"
                      placeholder="Ex: root1(@a, @b, @c)"
                      value={variable.expression || ''}
                      onChange={(e) => updateVariable(variable.id, { expression: e.target.value })}
                    />
                  </div>
                </div>
              ) : variable.type === 'integer' || variable.type === 'decimal' ? (
                <div className="flex gap-2 items-end mt-2">
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-500 font-bold uppercase mb-1 ml-1">Min</label>
                    <input 
                      type="number" 
                      className="w-full p-1 border rounded bg-white text-sm" 
                      value={variable.min ?? ''} 
                      onChange={(e) => handleNumberChange(variable.id, 'min', e.target.value)} 
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] text-gray-500 font-bold uppercase mb-1 ml-1">Max</label>
                    <input 
                      type="number" 
                      className="w-full p-1 border rounded bg-white text-sm" 
                      value={variable.max ?? ''} 
                      onChange={(e) => handleNumberChange(variable.id, 'max', e.target.value)} 
                    />
                  </div>
                  <div className="flex-[1.5]">
                    <label className="text-[10px] font-bold text-red-400 uppercase mb-1 ml-1 flex items-center gap-1">
                      Interdire <AlertCircle size={10} />
                    </label>
                    <input type="text" className="w-full p-1 border border-red-200 rounded bg-white text-sm placeholder-red-100" placeholder="0; -1" value={variable.exclusions || ''} onChange={(e) => updateVariable(variable.id, { exclusions: e.target.value })} />
                  </div>
                  {variable.type === 'decimal' && (
                    <div className="w-14">
                       <label className="text-[10px] text-gray-500 font-bold uppercase mb-1 ml-1">Déc.</label>
                       <input type="number" className="w-full p-1 border rounded bg-white text-sm" value={variable.decimals ?? 2} onChange={(e) => updateVariable(variable.id, { decimals: parseInt(e.target.value) })} />
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-2">
                   <label className="text-[10px] text-gray-500 font-bold uppercase mb-1 ml-1">Choix possibles</label>
                   <input
                    type="text"
                    className="w-full p-1 border rounded bg-white text-sm"
                    placeholder="sin,cos,tan"
                    value={variable.choices ? variable.choices.join(',') : ''}
                    onChange={(e) => updateVariable(variable.id, { 
                        choices: e.target.value.split(',').map(s => s.trim()) 
                    })}
                   />
                </div>
              )}
              
              {generatedValues[variable.name] !== undefined && (
                <div className="mt-3 flex justify-between items-center bg-white rounded border border-gray-100 px-2 py-1">
                  <span className="text-xs text-gray-400 font-medium">Valeur générée :</span>
                  <span className="text-sm font-mono font-bold text-purple-600 bg-purple-50 px-2 rounded">
                    {generatedValues[variable.name]}
                  </span>
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