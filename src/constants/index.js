export const chapters = [
  "Suites numériques",
  "Limites et continuité",
  "Dérivation et Fonctions",
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
    "Lire un tableau de signe ou de variation pour déterminer une limite",
    "Exploiter la continuité d’une fonction",
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

  "Dérivation et Fonctions": [
    "Calculer une dérivée",
    "Interpréter un taux de variation",
    "Déterminer les extremums par le calcul",
    "Dresser un tableau de signes/variations",
    "Déterminer des extremums graphiquement",
  ]

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
