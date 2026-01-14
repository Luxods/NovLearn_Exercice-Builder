import React, { useState } from 'react';
import { Eye, Code, RefreshCw, CloudUpload, Download } from 'lucide-react';
import { publishExerciseToDB } from '../utils/publishUtils';
import { exportToJSON } from '../utils/exportUtils';
import ImportModal from './ImportModal'; 

const Header = ({ previewMode, setPreviewMode, hasVariables, onRegenerate, currentExercise, onLoadExercise }) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const handlePublishAndSave = async () => {
    const isUpdate = !!currentExercise.id;
    const action = isUpdate ? "METTRE À JOUR" : "PUBLIER";
    
    if (!confirm(`Voulez-vous ${action} cet exercice sur Supabase ?`)) return;
    
    setIsPublishing(true);

    const result = await publishExerciseToDB(currentExercise);

    if (result.success) {
      // exportToJSON(currentExercise, true, true); // (Optionnel : téléchargement local)
      
      alert(`✅ Exercice sauvegardé avec succès ! (ID: ${result.data.id})\nLa page va maintenant se recharger pour un nouvel exercice.`);
      
      // --- MODIFICATION ICI : On recharge la page ---
      window.location.reload(); 
      
    } else {
      alert(`❌ Erreur : ${result.error}`);
      setIsPublishing(false); // On ne désactive le chargement qu'en cas d'erreur
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              🎓 Moteur d'Exercices
            </h1>
            {/* Indicateur de mode */}
            {currentExercise.id ? (
              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold border border-orange-200">
                MODE ÉDITION (ID: {currentExercise.id})
              </span>
            ) : (
              <p className="text-gray-600">Nouveau projet</p>
            )}
          </div>
          
          <div className="flex gap-2">
            
            {/* BOUTON IMPORTER */}
            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition border border-gray-300"
            >
              <Download size={18} />
              Charger
            </button>

            <div className="h-full w-px bg-gray-300 mx-2"></div>

            <button
              onClick={handlePublishAndSave}
              disabled={isPublishing}
              className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition shadow-md
                ${isPublishing 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-700'}`} 
            >
              {isPublishing ? <RefreshCw className="animate-spin" size={18} /> : <CloudUpload size={18} />}
              {currentExercise.id ? 'Mettre à jour' : 'Publier'}
            </button>

             <div className="h-full w-px bg-gray-300 mx-2"></div>

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
                className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
              >
                <RefreshCw size={18} />
                Régénérer
              </button>
            )}

          </div>
        </div>
      </div>

      {showImportModal && (
        <ImportModal 
          onClose={() => setShowImportModal(false)} 
          onLoadExercise={onLoadExercise} 
        />
      )}
    </>
  );
};

export default Header;