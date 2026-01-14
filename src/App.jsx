import React, { useState } from 'react';
// On a retiré 'Save' des imports car on ne l'utilise plus ici
import Header from './components/Header';
import ExerciseInfo from './components/ExerciseInfo';
import VariableManager from './components/VariableManager';
import ElementList from './components/ElementList';
import ExercisePreview from './components/ExercisePreview';
import Sidebar from './components/Sidebar';
import { useExercises } from './hooks/useExercises';
import { useVariables } from './hooks/useVariables';

const App = () => {
  const [previewMode, setPreviewMode] = useState(false);
  
  const {
    exercises,
    currentExercise,
    setCurrentExercise,
    addElement,
    updateElement,
    deleteElement,
    loadExercise, // <--- AJOUT : On récupère la fonction pour charger un exercice
    // saveExercise, 
    // exportJSON,   
  } = useExercises();

  const {
    generatedValues,
    addVariable,
    updateVariable,
    deleteVariable,
    regenerateValues
  } = useVariables(currentExercise, setCurrentExercise);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Header
          previewMode={previewMode}
          setPreviewMode={setPreviewMode}
          hasVariables={currentExercise.variables.length > 0}
          onRegenerate={regenerateValues}
          currentExercise={currentExercise}
          onLoadExercise={loadExercise} // <--- AJOUT : On la passe au Header
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-6">
            {!previewMode ? (
              <div className="space-y-6">
                <ExerciseInfo
                  currentExercise={currentExercise}
                  setCurrentExercise={setCurrentExercise}
                />
                
                <VariableManager
                  currentExercise={currentExercise}
                  generatedValues={generatedValues}
                  addVariable={addVariable}
                  updateVariable={updateVariable}
                  deleteVariable={deleteVariable}
                />
                
                <ElementList
                  currentExercise={currentExercise}
                  setCurrentExercise={setCurrentExercise}
                  updateElement={updateElement}
                  deleteElement={deleteElement}
                  addElement={addElement}
                />
                
                {/* L'ancien bouton "Sauvegarder" a été supprimé ici */}
                
              </div>
            ) : (
              <ExercisePreview
                currentExercise={currentExercise}
                generatedValues={generatedValues}
              />
            )}
          </div>
          
          {/* On ne passe plus exportJSON à la Sidebar */}
          <Sidebar exercises={exercises} />
        </div>
      </div>
    </div>
  );
};

export default App;