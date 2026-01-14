import React, { useEffect, useState } from 'react';
import { X, Download, Loader, Trash2, Copy } from 'lucide-react'; // Ajout de Copy
import { fetchExercisesList, fetchFullExercise, deleteExerciseFromDB } from '../utils/publishUtils';

const ImportModal = ({ onClose, onLoadExercise }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [importingId, setImportingId] = useState(null); // Sert de loading global pour l'action en cours

  useEffect(() => {
    loadList();
  }, []);

  const loadList = async () => {
    const result = await fetchExercisesList();
    if (result.success) {
      setList(result.data);
    } else {
      alert("Erreur de chargement : " + result.error);
    }
    setLoading(false);
  };

  // Action 1 : Importer pour MODIFIER (Garde l'ID)
  const handleSelect = async (id) => {
    setImportingId(id);
    const result = await fetchFullExercise(id);
    
    if (result.success) {
      // TRUE = On garde l'ID (Mode Édition)
      onLoadExercise(result.data, true); 
      onClose();
      alert(`✅ Exercice "${result.data.title}" chargé pour modification !`);
    } else {
      alert("Erreur lors de l'import : " + result.error);
    }
    setImportingId(null);
  };

  // Action 2 : Dupliquer (Nouveau sans ID)
  const handleDuplicate = async (e, id) => {
    e.stopPropagation();
    setImportingId(id);
    const result = await fetchFullExercise(id);
    
    if (result.success) {
      // On modifie le titre pour que ce soit clair
      const duplicatedExercise = {
        ...result.data,
        title: `${result.data.title} (Copie)`
      };

      // FALSE = On retire l'ID (Mode Création / Duplication)
      onLoadExercise(duplicatedExercise, false); 
      onClose();
      alert(`📋 Exercice dupliqué ! Vous êtes maintenant sur un NOUVEL exercice basé sur "${result.data.title}".`);
    } else {
      alert("Erreur lors de la duplication : " + result.error);
    }
    setImportingId(null);
  };

  // Action 3 : Supprimer
  const handleDelete = async (e, id, title) => {
    e.stopPropagation();
    
    if (!confirm(`⚠️ Êtes-vous sûr de vouloir supprimer définitivement l'exercice "${title}" ?\nCette action est irréversible.`)) {
      return;
    }

    const previousList = list;
    setList(list.filter(item => item.id !== id));

    const result = await deleteExerciseFromDB(id);
    
    if (!result.success) {
       setList(previousList);
       alert("❌ Erreur lors de la suppression : " + result.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Download className="text-blue-600" />
            Gérer les exercices (Supabase)
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Liste */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader className="animate-spin text-blue-500" size={32} />
            </div>
          ) : list.length === 0 ? (
            <p className="text-center text-gray-500">Aucun exercice trouvé dans la base.</p>
          ) : (
            <div className="grid gap-3">
              {list.map((ex) => (
                <div
                  key={ex.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition group bg-white"
                >
                  {/* Clic principal : Importer/Modifier */}
                  <div 
                    onClick={() => handleSelect(ex.id)}
                    className="flex-1 cursor-pointer"
                  >
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        {ex.title}
                        {importingId === ex.id && <Loader size={14} className="animate-spin text-blue-600"/>}
                    </h3>
                    <div className="text-sm text-gray-500 flex gap-3 mt-1">
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{ex.chapter}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        ex.difficulty === 'Facile' ? 'bg-green-100 text-green-700' :
                        ex.difficulty === 'Difficile' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {ex.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Boutons d'action */}
                  <div className="flex items-center gap-1 pl-4 border-l ml-4 border-gray-100">
                    
                    {/* 1. DUPLIQUER */}
                    <button
                        onClick={(e) => handleDuplicate(e, ex.id)}
                        disabled={importingId !== null}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition"
                        title="Dupliquer (Créer une copie)"
                    >
                        <Copy size={20} />
                    </button>

                    {/* 2. IMPORTER (MODIFIER) */}
                    <button
                        onClick={() => handleSelect(ex.id)}
                        disabled={importingId !== null}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition"
                        title="Modifier l'original"
                    >
                        <Download size={20} />
                    </button>

                    {/* 3. SUPPRIMER */}
                    <button
                        onClick={(e) => handleDelete(e, ex.id, ex.title)}
                        disabled={importingId !== null}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition"
                        title="Supprimer définitivement"
                    >
                        <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportModal;