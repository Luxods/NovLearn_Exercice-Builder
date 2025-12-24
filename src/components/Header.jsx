import React, { useState } from 'react';
import { Eye, Code, RefreshCw, CloudUpload, Save } from 'lucide-react';
import { publishExerciseToDB } from '../utils/publishUtils';
import { exportToJSON } from '../utils/exportUtils'; // On réutilise ton export existant

// Ajoute 'currentExercise' dans les props reçues par le Header
const Header = ({ previewMode, setPreviewMode, hasVariables, onRegenerate, currentExercise }) => {
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublishAndSave = async () => {
    // 1. Confirmation
    if (!confirm("Voulez-vous publier cet exercice en ligne et sauvegarder une copie locale ?")) return;
    
    setIsPublishing(true);

    // 2. Publication vers Supabase
    const result = await publishExerciseToDB(currentExercise);

    if (result.success) {
      // 3. Si succès, on déclenche aussi le téléchargement local (Backup)
      exportToJSON(currentExercise, true, true); // (exercise, includeAnswers, prettify)
      
      alert(`✅ Exercice publié avec succès ! (ID: ${result.data.id})\nUne copie locale a été téléchargée.`);
    } else {
      alert(`❌ Erreur lors de la publication : ${result.error}`);
    }

    setIsPublishing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            🎓 Moteur d'Exercices - NovLearn
          </h1>
          <p className="text-gray-600">
            Créez des exercices avec des variables aléatoires pour un contenu illimité !
          </p>
        </div>
        <div className="flex gap-2">
          
          {/* Nouveau bouton PUBLIER & SAUVEGARDER */}
          <button
            onClick={handlePublishAndSave}
            disabled={isPublishing}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition shadow-md
              ${isPublishing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {isPublishing ? (
              <RefreshCw className="animate-spin" size={18} />
            ) : (
              <CloudUpload size={18} />
            )}
            {isPublishing ? 'Envoi...' : 'Publier & Sauvegarder'}
          </button>

          <div className="h-full w-px bg-gray-300 mx-2"></div>

          {/* Tes boutons existants */}
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            {previewMode ? <Code size={18} /> : <Eye size={18} />}
            {previewMode ? 'Éditer' : 'Aperçu'}
          </button>
          
          {previewMode && hasVariables && (
            <button
              onClick={onRegenerate}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              <RefreshCw size={18} />
              Régénérer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;