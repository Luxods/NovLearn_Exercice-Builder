// src/components/ImportModal.jsx
import React, { useEffect, useState } from 'react';
import { X, Download, Loader } from 'lucide-react';
import { fetchExercisesList, fetchFullExercise } from '../utils/publishUtils';

const ImportModal = ({ onClose, onLoadExercise }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [importingId, setImportingId] = useState(null);

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

  const handleSelect = async (id) => {
    setImportingId(id);
    const result = await fetchFullExercise(id);
    
    if (result.success) {
      // On charge l'exercice en demandant de PRESERVER l'ID (true)
      onLoadExercise(result.data, true); 
      onClose();
      alert(`✅ Exercice "${result.data.title}" chargé pour modification !`);
    } else {
      alert("Erreur lors de l'import : " + result.error);
    }
    setImportingId(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        
        {/* Header du Modal */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Download className="text-blue-600" />
            Importer depuis Supabase
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Liste des exercices */}
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
                <button
                  key={ex.id}
                  onClick={() => handleSelect(ex.id)}
                  disabled={importingId !== null}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition text-left group"
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">{ex.title}</h3>
                    <div className="text-sm text-gray-500 flex gap-3">
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
                  {importingId === ex.id ? (
                    <Loader size={20} className="animate-spin text-blue-600" />
                  ) : (
                    <Download size={20} className="text-gray-400 group-hover:text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportModal;