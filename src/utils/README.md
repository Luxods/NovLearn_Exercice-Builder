# 🛠️ Utilitaires - Documentation

## Vue d'ensemble

Le dossier `/src/utils/` contient les fonctions utilitaires essentielles pour le fonctionnement de l'application.

## 📁 Fichiers

### 1. **mathRenderer.jsx** ⭐ CORE

Le moteur de rendu mathématique de l'application.

#### Fonctions principales

##### `MathText` (Composant React)

Composant principal pour afficher du texte avec LaTeX et variables.

```jsx
import { MathText } from "../utils/mathRenderer";

<MathText
  content="Calculer $f({a}) = {a}x^2 + {b}x + {c}$"
  variables={{ a: 2, b: -3, c: 1 }}
  className="text-gray-800"
  requireBraces={true}
/>;
```

**Props:**

- `content` (string) - Texte avec LaTeX (`$...$`) et variables (`{a}`)
- `variables` (object) - Valeurs des variables `{ a: 2, b: 3 }`
- `className` (string) - Classes CSS
- `requireBraces` (boolean) - `true` = nécessite `{a}`, `false` = remplace aussi `a`

##### `replaceVariablesWithBraces(text, variables)`

Remplace les variables **avec accolades** `{a}` par leurs valeurs.

```javascript
replaceVariablesWithBraces("{a}x^2 + {b}x + {c}", { a: 2, b: -3, c: 1 });
// → "2x^2 - 3x + 1"
```

##### `replaceVariablesWithoutBraces(text, variables)`

Remplace les variables **sans accolades** `a` par leurs valeurs.

```javascript
replaceVariablesWithoutBraces("ax^2 + bx + c", { a: 2, b: -3, c: 1 });
// → "2x^2 - 3x + 1"
```

##### `replaceVariables(text, variables, requireBraces)`

Version automatique qui choisit selon `requireBraces`.

##### `formatMathExpression(expression, variables)`

Formate une expression mathématique en remplaçant les variables.

#### Caractéristiques

✅ Gestion intelligente des signes (+/-)  
✅ Nettoyage automatique des expressions  
✅ Support LaTeX inline (`$...$`) et bloc (`$$...$$`)  
✅ Rendu via KaTeX (react-katex)

---

### 2. **evaluateExpression.js**

Évalue les expressions en remplaçant les variables.

```javascript
import { evaluateExpression } from "../utils/evaluateExpression";

evaluateExpression("{a}x + {b}", { a: 2, b: 3 });
// → "2x + 3"
```

**Note:** Version simple. Pour expressions mathématiques complexes, préférer `mathRenderer`.

---

### 3. **generateRandomValues.js**

Génère des valeurs aléatoires pour les variables d'un exercice.

```javascript
import { generateRandomValues } from "../utils/generateRandomValues";

const variables = [
  { name: "a", type: "integer", min: 1, max: 10 },
  { name: "b", type: "decimal", min: 0, max: 5, decimals: 2 },
  { name: "c", type: "choice", choices: [2, 4, 6, 8] },
];

const values = generateRandomValues(variables);
// → { a: 7, b: 3.14, c: 4 }
```

**Types supportés:**

- `integer` - Entier entre min et max
- `decimal` - Décimal avec nombre de décimales
- `choice` / `math` - Sélection aléatoire dans une liste

---

### 4. **defaultContent.js** ✅ UPDATED

Contenu par défaut pour chaque type d'élément (maintenant avec LaTeX).

```javascript
import { getDefaultContent } from "../utils/defaultContent";

const defaultText = getDefaultContent("text");
// → { text: "Énoncé de l'exercice. Utilisez {a}, {b}... pour les variables et $...$ pour LaTeX." }

const defaultFunction = getDefaultContent("function");
// → { expression: "{a}\\sin(x)+{b}", domain: "\\mathbb{R}", ... }
```

**Types disponibles:**

- `text`, `function`, `graph`, `equation`, `question`, `mcq`
- `sequence`, `vector`, `complex_plane`, `stats_table`
- `variation_table`, `sign_table`, `proba_tree`

**Nouveautés:**

- ✅ Variables entre accolades `{a}`, `{b}`
- ✅ Notation LaTeX moderne (`\sin`, `\mathbb{R}`)
- ✅ Exemples cohérents avec les éditeurs

---

### 5. **exportUtils.js**

Gestion de l'export/import des exercices.

#### Fonctions principales

##### `exportToJSON(exercises, includeAnswers, prettify)`

Exporte les exercices en JSON (un fichier par exercice).

```javascript
import { exportToJSON } from "../utils/exportUtils";

// Export version élève (sans réponses)
exportToJSON(exercises, false, true);

// Export version prof (avec réponses)
exportToJSON(exercises, true, true);
```

**Paramètres:**

- `exercises` (Array) - Liste des exercices
- `includeAnswers` (boolean) - `true` = version prof, `false` = version élève
- `prettify` (boolean) - `true` = JSON indenté

##### `exportAllInOne(exercises, filename, includeAnswers, prettify)`

Exporte tous les exercices dans un seul fichier.

##### `importFromJSON(file)`

Importe des exercices depuis un fichier JSON.

```javascript
import { importFromJSON } from "../utils/exportUtils";

const file = event.target.files[0];
const exercises = await importFromJSON(file);
```

##### `validateExercise(exercise)`

Valide la structure d'un exercice.

```javascript
import { validateExercise } from "../utils/exportUtils";

const { valid, errors } = validateExercise(exercise);
if (!valid) {
  console.error("Erreurs:", errors);
}
```

**Validation:**

- ✅ Titre non vide
- ✅ Chapitre défini
- ✅ Au moins un élément

---

## 🔄 Relations entre utils

```
┌─────────────────────┐
│  generateRandomValues│  Génère valeurs aléatoires
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│   evaluateExpression │  Remplace variables simples
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│    mathRenderer      │  Rendu LaTeX + Variables ⭐
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│     Renderers        │  Affichage final
└─────────────────────┘

┌─────────────────────┐
│   defaultContent     │  Contenu initial
└─────────────────────┘
           │
           ↓
┌─────────────────────┐
│      Editors         │  Création exercices
└─────────────────────┘
           │
           ↓
┌─────────────────────┐
│    exportUtils       │  Export/Import JSON
└─────────────────────┘
```

## 💡 Bonnes pratiques

### Pour les éditeurs

```jsx
import { getDefaultContent } from "../utils/defaultContent";

// Utiliser defaultContent pour initialiser
const [content, setContent] = useState(getDefaultContent("text"));
```

### Pour les renderers

```jsx
import { MathText } from "../utils/mathRenderer";

// Toujours utiliser MathText pour afficher du texte avec variables
<MathText
  content={content.text}
  variables={generatedValues}
  requireBraces={true}
/>;
```

### Pour les hooks

```javascript
import { generateRandomValues } from "../utils/generateRandomValues";

// Générer les valeurs au chargement de l'exercice
const values = generateRandomValues(exercise.variables);
```

## 🎯 Checklist d'utilisation

Lors de la création d'un nouvel élément :

- [ ] Ajouter le type dans `defaultContent.js`
- [ ] Utiliser `MathText` dans le renderer
- [ ] Supporter les variables `{a}`, `{b}`, etc.
- [ ] Supporter LaTeX avec `$...$`
- [ ] Exporter/importer via `exportUtils`

## ⚡ Performance

**mathRenderer.jsx** utilise :

- Regex optimisées pour le remplacement
- Nettoyage intelligent (évite les doubles calculs)
- KaTeX en cache (react-katex)

**generateRandomValues.js** :

- Génération O(n) où n = nombre de variables
- Pas de dépendances lourdes

**exportUtils.js** :

- Utilise Blob API (natif navigateur)
- Timeout entre exports multiples (évite blocage)

## 🔧 Maintenance

### Tests recommandés

```javascript
// mathRenderer
replaceVariablesWithBraces("{a} + {b}", { a: 2, b: -3 });
// Doit retourner: "2 - 3"

// generateRandomValues
generateRandomValues([{ name: "a", type: "integer", min: 1, max: 1 }]);
// Doit retourner: { a: 1 }

// exportUtils
validateExercise({ title: "", elements: [] });
// Doit retourner: { valid: false, errors: [...] }
```

### Évolutions futures

- [ ] Support d'autres moteurs de rendu (MathJax?)
- [ ] Export vers d'autres formats (PDF, Markdown)
- [ ] Générateur de valeurs avec contraintes (a ≠ b)
- [ ] Cache pour les expressions calculées

---

✨ **Tous les utils sont maintenant à jour et cohérents avec la syntaxe LaTeX !**
