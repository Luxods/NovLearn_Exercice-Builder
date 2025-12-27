import React from 'react';
import { FileText } from 'lucide-react'; // Plus besoin de Download

const Sidebar = ({ exercises }) => {
  // Suppression de tout l'état lié à l'export modal

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-fit lg:sticky lg:top-6">

      {/* Guide Rapide - CONSERVÉ */}
      <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-bold text-blue-900 text-sm mb-2">💡 Guide rapide</h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Créez des variables (a, b, c...)</li>
          <li>• Utilisez {'{a}'}, {'{b}'} dans les textes</li>
          <li>• Sélectionnez les compétences travaillées</li>
        </ul>
      </div>

      {/* Guide Latex - CONSERVÉ */}
      <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
        <h3 className="font-bold text-indigo-900 text-sm mb-2">📐 Guide Latex</h3>
        <ul className="text-xs text-indigo-800 space-y-1 font-mono">
          <li>• Fractions: \frac{'{a}'}{'{b}'}</li>
          <li>• Racines: \sqrt{'{x}'}</li>
          <li>• Puissances: x^{'{n}'}</li>
          <li>• Indices: u_{'{n}'}</li>
          <li>• Vecteurs: \vec{'{v}'}</li>
          <li>• \pi, \infty, \geq, \in, \mathbb{'{R}'}</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;