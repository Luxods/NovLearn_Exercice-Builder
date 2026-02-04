export const chapters = [
  "Suites numériques",
  "Limites et continuité",
  "Fonctions",
  "Dérivabilité",
  "Logarithme néperien",
  "Primitives et équadiff",
  "Convexité",
  "Stats",
  "Probas",
];

export const difficulties = ["Facile", "Moyen", "Difficile"];

export const COMPETENCES_BY_CHAPTER = {
  "Limites et continuité": [
    "Savoir si une fonction est continue",
    "Calculer une limite en un point",
    "Identifier une asymptote horizontale/verticale",
    "Utiliser les limites usuelles",
    "Dresser un tableau de signes et variations",
    "Déterminer des maximums et minimums",
  ],

  Fonctions: [
    "Déterminer le domaine de définition",
    "Étudier la parité",
    "Étudier la périodicité",
    "Résoudre une équation",
    "Résoudre une inéquation",
    "Étudier le signe",
    "Tracer la courbe représentative",
    "Déterminer une asymptote",
    "Utiliser la composition",
  ],

  "Suites numériques": [
    "Définir une suite",
    "Calculer des termes",
    "Étudier les variations (croissance/décroissance)",
    "Déterminer une limite",
    "Reconnaître des suites arithmétiques/géométriques",
    "Modéliser une situation par une suite",
    "Interpréter graphiquement une suite",
  ],

  Probabilités: [
    "Modéliser une situation",
    "Utiliser un arbre pondéré",
    "Calculer une probabilité",
    "Calculer une probabilité conditionnelle",
    "Utiliser la formule des probabilités totales",
    "Reconnaître une loi de probabilité",
    "Utiliser une loi binomiale",
    "Utiliser une loi normale",
    "Calculer une espérance",
    "Calculer une variance",
  ],

  Statistiques: [
    "Calculer la moyenne",
    "Calculer la médiane",
    "Calculer les quartiles",
    "Calculer l'écart-type",
    "Calculer la variance",
    "Interpréter un diagramme",
    "Tracer un diagramme",
    "Étudier une série statistique",
    "Utiliser une régression linéaire",
  ],

  Géométrie: [
    "Calculer un produit scalaire",
    "Calculer une norme",
    "Déterminer une équation de droite",
    "Déterminer une équation de plan",
    "Étudier l'orthogonalité",
    "Étudier le parallélisme",
    "Calculer une distance",
    "Utiliser la colinéarité",
    "Résoudre un problème de géométrie dans l'espace",
  ],

  "Nombres complexes": [
    "Calculer avec les nombres complexes",
    "Déterminer la forme algébrique",
    "Déterminer la forme exponentielle",
    "Déterminer le module",
    "Déterminer l'argument",
    "Utiliser la conjugaison",
    "Résoudre une équation",
    "Interpréter géométriquement",
    "Utiliser les transformations",
  ],

  Algorithme: [
    "Écrire un algorithme",
    "Analyser un algorithme",
    "Utiliser une boucle",
    "Utiliser une condition",
    "Utiliser une variable",
    "Programmer en Python",
    "Tester un algorithme",
    "Optimiser un algorithme",
  ],
};

export const getCompetencesByChapter = (chapter) => {
  return COMPETENCES_BY_CHAPTER[chapter] || [];
};

export const getAllCompetences = () => {
  return Object.values(COMPETENCES_BY_CHAPTER).flat();
};

export const searchCompetences = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return getAllCompetences().filter((comp) =>
    comp.toLowerCase().includes(term),
  );
};

export const elementTypes = [
  { type: "text", label: "Texte/Énoncé", icon: "📝", chapters: "all" },
  { type: "function", label: "Fonction", icon: "📈", chapters: "all" },
  { type: "graph", label: "Graphe", icon: "📊", chapters: "all" },
  {
    type: "variationTable",
    label: "Tableau de variations",
    icon: "📋",
    chapters: "all",
  },
  { type: "signTable", label: "Tableau de signes", icon: "±", chapters: "all" },
  {
    type: "probaTree",
    label: "Arbre de probabilité",
    icon: "🌳",
    chapters: "all",
  },
  { type: "sequence", label: "Suite", icon: "🔢", chapters: "all" },
  {
    type: "discreteGraph",
    label: "Graphe Discret",
    icon: "📊",
    chapters: "all",
  },
  { type: "complexPlane", label: "Plan complexe", icon: "🔷", chapters: "all" },
  { type: "vector", label: "Vecteur", icon: "➡️", chapters: "all" },
  {
    type: "statsTable",
    label: "Tableau statistique",
    icon: "📊",
    chapters: "all",
  },
  { type: "equation", label: "Équation", icon: "∑", chapters: "all" },
  { type: "question", label: "Question", icon: "❓", chapters: "all" },
  { type: "mcq", label: "QCM", icon: "☑️", chapters: "all" },
];
