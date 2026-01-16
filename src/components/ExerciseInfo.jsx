// src/components/ExerciseInfo.jsx
import React, { useState } from 'react';
import { chapters, difficulties, COMPETENCES_BY_CHAPTER } from '../constants';
import { ChevronDown, ChevronRight, Check, X } from 'lucide-react';

const ExerciseInfo = ({ currentExercise, setCurrentExercise }) => {
  const [showCompetences, setShowCompetences] = useState(false);
  const availableCompetences = COMPETENCES_BY_CHAPTER[currentExercise.chapter] || [];
  
  // ... (Garder les fonctions toggleCompetence, clearCompetences, handleChapterChange telles quelles)
  const toggleCompetence = (competence) => {
    const currentCompetences = currentExercise.competences || [];
    if (currentCompetences.includes(competence)) {
      setCurrentExercise({ ...currentExercise, competences: currentCompetences.filter(c => c !== competence) });
    } else {
      setCurrentExercise({ ...currentExercise, competences: [...currentCompetences, competence] });
    }
  };

  const clearCompetences = () => {
    setCurrentExercise({ ...currentExercise, competences: [] });
  };

  const handleChapterChange = (newChapter) => {
    setCurrentExercise({
      ...currentExercise,
      chapter: newChapter,
      competences: []
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2">📋 Informations Générales</h2>
      
      {/* DOUBLE INPUT POUR LES TITRES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Nom Développeur (Interne) */}
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Nom de l'exercice (Interne)
          </label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 outline-none text-sm"
            value={currentExercise.title}
            onChange={(e) => setCurrentExercise({...currentExercise, title: e.target.value})}
            placeholder="Ex: Logarithme_Bac"
          />
        </div>

        {/* 2. Titre Application (Élève) */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
          <label className="block text-xs font-bold text-blue-600 uppercase mb-1">
            Titre dans l'application (Élève)
          </label>
          <input
            type="text"
            className="w-full p-2 border border-blue-200 rounded focus:border-blue-500 outline-none text-sm"
            value={currentExercise.appTitle || ''}
            onChange={(e) => setCurrentExercise({...currentExercise, appTitle: e.target.value})}
            placeholder="Ex: Étude de fonction logarithme"
          />
          <p className="text-[10px] text-blue-400 mt-1">C'est ce titre que l'élève verra en haut de la page</p>
        </div>
      </div>

      {/* Chapitre, Difficulté */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Chapitre</label>
          <select
            className="w-full p-2 border-2 border-gray-300 rounded-lg"
            value={currentExercise.chapter}
            onChange={(e) => handleChapterChange(e.target.value)}
          >
            {chapters.map(ch => <option key={ch}>{ch}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Difficulté</label>
          <select
            className="w-full p-2 border-2 border-gray-300 rounded-lg"
            value={currentExercise.difficulty}
            onChange={(e) => setCurrentExercise({...currentExercise, difficulty: e.target.value})}
          >
            {difficulties.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {/* Compétences (Inchangé) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium">
            Compétences ({currentExercise.competences?.length || 0})
          </label>
          <button
            type="button"
            onClick={() => setShowCompetences(!showCompetences)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            {showCompetences ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        {/* Compétences sélectionnées */}
        {currentExercise.competences && currentExercise.competences.length > 0 && (
          <div className="p-2 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-blue-700">
                Compétences sélectionnées:
              </span>
              <button
                onClick={clearCompetences}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Tout effacer
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {currentExercise.competences.map((comp, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs flex items-center gap-1"
                >
                  {comp}
                  <button
                    onClick={() => toggleCompetence(comp)}
                    className="hover:text-blue-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Liste des compétences disponibles */}
        {showCompetences && (
          <div className="border-2 border-gray-200 rounded-lg p-2 max-h-60 overflow-y-auto">
            {availableCompetences.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-2">
                Sélectionnez un chapitre pour voir les compétences
              </p>
            ) : (
              <div className="space-y-1">
                {availableCompetences.map((competence, idx) => {
                  const isSelected = currentExercise.competences?.includes(competence);
                  
                  return (
                    <label
                      key={idx}
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-gray-50 ${
                        isSelected ? 'bg-blue-50' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleCompetence(competence)}
                        className="rounded"
                      />
                      <span className="text-sm">{competence}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseInfo;