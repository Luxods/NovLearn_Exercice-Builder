# 📘 Exercise Builder

Une application web interactive pour créer et gérer des exercices de mathématiques, développée avec React + Vite.
Support complet de LaTeX pour des expressions mathématiques professionnelles.

## 🚀 Installation et exécution locale

1. **Cloner le dépôt**
```bash
git clone https://github.com/Luxods/NovLearn_Exercice-Builder.git
cd Novlearn_Exercice-Builder
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

Le projet sera accessible à l'adresse :
👉 **http://localhost:5173**

## 🔧 Configuration

👉 Pour modifier les chapitres / compétences : voir `/src/constants/index.js`

## 📐 Utilisation de LaTeX

**Tous les éditeurs supportent la syntaxe LaTeX !**

### Syntaxe de base
- **Variables dynamiques** : `{a}`, `{b}`, `{c}` → remplacées par des valeurs aléatoires
- **LaTeX inline** : `$expression$` → formules mathématiques
- **Combiné** : `$f(x) = {a}x^2 + {b}x + {c}$`

### Guide complet
📖 **Consultez [GUIDE_LATEX.md](GUIDE_LATEX.md)** pour :
- Tous les symboles mathématiques
- Exemples par type d'élément
- Syntaxe avancée (matrices, systèmes, intégrales...)
- Pièges courants et solutions

### Exemples rapides
```latex
Fractions: \frac{{a}}{{b}}
Racines: \sqrt{{a}x + {b}}
Puissances: {a}x^{2} + {b}x + {c}
Indices: U_n ou U_{n+1}
Somme: \sum_{i=1}^{{n}}
Intégrale: \int_{{a}}^{{b}} x^2 dx
Limites: \lim_{x \to \infty}
Systèmes: \begin{cases} {a}x + {b}y = {c} \\ {d}x + {e}y = {f} \end{cases}
Ensembles: \mathbb{R}, \mathbb{N}, \mathbb{Z}
Symboles grecs: \alpha, \beta, \pi, \Delta
Opérateurs: \leq, \geq, \neq, \approx, \pm, \infty
```

## 📦 Format des exercices JSON

```json
{
  "id": 1,
  "title": "Équation du second degré",
  "chapter": "Algèbre",
  "difficulty": "moyen",
  "variables": [
    {
      "id": 1,
      "name": "a",
      "type": "integer",
      "min": 1,
      "max": 5
    }
  ],
  "elements": [
    {
      "id": 1,
      "type": "text",
      "content": {
        "text": "Résoudre l'équation ${a}x^2 + {b}x + {c} = 0$"
      }
    },
    {
      "id": 2,
      "type": "equation",
      "content": {
        "latex": "{a}x^2 + {b}x + {c} = 0"
      }
    }
  ]
}
```

## 🎯 Types d'éléments disponibles

- **text** - Texte avec support LaTeX
- **function** - Fonctions mathématiques
- **equation** - Équations et systèmes
- **graph** - Graphiques de fonctions
- **sequence** - Suites numériques
- **question** - Questions avec réponse
- **mcq** - Questions à choix multiples
- **vector** - Vecteurs 2D/3D
- **stats-table** - Tableaux statistiques
- **sign-table** - Tableaux de signes
- **variation-table** - Tableaux de variations
- **proba-tree** - Arbres de probabilités
- **complex-plane** - Plan complexe
- **discrete-graph** - Graphes discrets

## 🚀 Déploiement

### Sur Vercel
1. Connectez votre repo GitHub à Vercel
2. Vercel détecte automatiquement Vite
3. Déployez !

Le projet est configuré pour Vercel avec :
- Framework : Vite (détection automatique)
- Build Command : `npm run build`
- Output Directory : `dist`


## 🛠️ Technologies

- **React 19** - Framework UI
- **Vite 7** - Build tool
- **KaTeX** - Rendu LaTeX
- **Lucide React** - Icônes
- **FileSaver** - Export de fichiers

## 📝 License

ISC

```
Novlearn_Exercice-Builder
├─ GUIDE_LATEX.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ logo.jpg
├─ README
├─ README.md
├─ src
│  ├─ App.jsx
│  ├─ components
│  │  ├─ ElementList.jsx
│  │  ├─ ExerciseInfo.jsx
│  │  ├─ ExercisePreview.jsx
│  │  ├─ ExportModal.jsx
│  │  ├─ Header.jsx
│  │  ├─ Sidebar.jsx
│  │  └─ VariableManager.jsx
│  ├─ constants
│  │  └─ index.js
│  ├─ editors
│  │  ├─ ComplexPlaneEditor.jsx
│  │  ├─ DiscreteGraphEditor.jsx
│  │  ├─ ElementEditor.jsx
│  │  ├─ EquationEditor.jsx
│  │  ├─ FunctionEditor.jsx
│  │  ├─ GraphEditor.jsx
│  │  ├─ MCQEditor.jsx
│  │  ├─ ProbaTreeEditor.jsx
│  │  ├─ QuestionEditor.jsx
│  │  ├─ README
│  │  ├─ SequenceEditor.jsx
│  │  ├─ SignTableEditor.jsx
│  │  ├─ StatsTableEditor.jsx
│  │  ├─ TextEditor.jsx
│  │  ├─ VariationTableEditor.jsx
│  │  └─ VectorEditor.jsx
│  ├─ hooks
│  │  ├─ useCorrection.js
│  │  ├─ useExercises.js
│  │  └─ useVariables.js
│  ├─ main.jsx
│  ├─ renderers
│  │  ├─ ComplexPlaneRenderer.jsx
│  │  ├─ DiscreteGraphRenderer.jsx
│  │  ├─ ElementRenderer.jsx
│  │  ├─ EquationRenderer.jsx
│  │  ├─ FunctionRenderer.jsx
│  │  ├─ GraphRenderer.jsx
│  │  ├─ MCQRenderer.jsx
│  │  ├─ ProbaTreeRenderer.jsx
│  │  ├─ QuestionRenderer.jsx
│  │  ├─ README
│  │  ├─ SequenceRenderer.jsx
│  │  ├─ SignTableRenderer.jsx
│  │  ├─ StatsTableRenderer.jsx
│  │  ├─ TextRenderer.jsx
│  │  ├─ VariationTableRenderer.jsx
│  │  └─ VectorRenderer.jsx
│  ├─ styles
│  │  ├─ base.css
│  │  ├─ components.css
│  │  ├─ index.css
│  │  └─ utilities.css
│  └─ utils
│     ├─ defaultContent.js
│     ├─ evaluateExpression.js
│     ├─ exportUtils.js
│     ├─ generateRandomValues.js
│     ├─ mathRenderer.jsx
│     └─ README.md
└─ vite.config.js

```