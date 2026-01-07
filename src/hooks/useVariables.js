import { useState, useEffect, useCallback } from 'react';
import { generateRandomValues } from '../utils/generateRandomValues';

export const useVariables = (currentExercise, setCurrentExercise) => {
  const [generatedValues, setGeneratedValues] = useState({});

  // CRUD basique (inchangé)
  const addVariable = () => {
    setCurrentExercise(prev => ({
      ...prev,
      // Si variables est undefined au départ, on initialise avec []
      variables: [...(prev.variableDefinitions || prev.variables || []), {
        id: Date.now(),
        name: 'a',
        type: 'integer',
        min: 1,
        max: 10,
        decimals: 2,
        choices: [],
        expression: '' // Important pour les computed vars
      }]
    }));
  };

  const updateVariable = (id, updates) => {
    const listName = currentExercise.variableDefinitions ? 'variableDefinitions' : 'variables';
    
    setCurrentExercise(prev => ({
      ...prev,
      [listName]: (prev[listName] || []).map(v => 
        v.id === id ? { ...v, ...updates } : v
      )
    }));
  };

  const deleteVariable = (id) => {
    const listName = currentExercise.variableDefinitions ? 'variableDefinitions' : 'variables';

    setCurrentExercise(prev => ({
      ...prev,
      [listName]: (prev[listName] || []).filter(v => v.id !== id)
    }));
  };

  // --- C'est ici que la magie opère ---
  
  // On récupère la liste des variables proprement (peu importe si elle s'appelle variables ou variableDefinitions)
  const varsList = currentExercise.variableDefinitions || currentExercise.variables || [];

  // On crée une signature unique du contenu pour déclencher le useEffect même si length ne change pas
  // Ex: si tu changes min:1 en min:5, la string change -> useEffect se lance
  const variablesSignature = JSON.stringify(varsList);

  const regenerateValues = useCallback(() => {
    if (!varsList || varsList.length === 0) {
      setGeneratedValues({});
      return;
    }

    // On appelle ta fonction qui attend un Tableau (C'est bon !)
    const newValues = generateRandomValues(varsList);
    setGeneratedValues(newValues);
  }, [variablesSignature]); // Dépendance sur la signature JSON

  // Effet qui se lance dès que la signature change (ajout, modif, suppression)
  useEffect(() => {
    regenerateValues();
  }, [regenerateValues]);

  return {
    generatedValues,
    addVariable,
    updateVariable,
    deleteVariable,
    regenerateValues
  };
};

export default useVariables;