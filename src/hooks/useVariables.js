import { useState, useEffect, useCallback } from 'react';
import { generateRandomValues } from '../utils/generateRandomValues';

export const useVariables = (currentExercise, setCurrentExercise) => {
  const [generatedValues, setGeneratedValues] = useState({});

  // CRUD basique
  const addVariable = () => {
    setCurrentExercise(prev => ({
      ...prev,
      variables: [...(prev.variableDefinitions || prev.variables || []), {
        id: Date.now(),
        name: 'a',
        type: 'integer',
        min: 1,
        max: 10,
        exclusions: '', // <--- AJOUTÉ ICI : Initialisation du champ vide
        decimals: 2,
        choices: [],
        expression: ''
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

  // --- Logique de génération ---
  const varsList = currentExercise.variableDefinitions || currentExercise.variables || [];
  
  // Signature pour détecter les changements (inclut maintenant exclusions grâce à JSON.stringify)
  const variablesSignature = JSON.stringify(varsList);

  const regenerateValues = useCallback(() => {
    if (!varsList || varsList.length === 0) {
      setGeneratedValues({});
      return;
    }
    const newValues = generateRandomValues(varsList);
    setGeneratedValues(newValues);
  }, [variablesSignature]);

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