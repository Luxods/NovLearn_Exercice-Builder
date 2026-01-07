/**
 * Fournit le contenu par défaut lors de la création d'un nouvel élément
 * Utilise la syntaxe @variable pour être cohérent avec le reste du projet.
 */
export const defaultContent = {
  text: {
    text: "Soit une fonction $f$ définie sur @I...",
  },

  function: {
    name: "f",
    expression: "@a x^2 + @b", // Plus de sin(x) pour simplifier le défaut
    definitionSet: "\\mathbb{R}",
  },

  graph: {
    functions: [{ expression: "x^2", color: "#2563eb" }],
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    showGrid: true,
  },

  equation: {
    type: "simple",
    latex: "@a x + @b = 0",
    requireAnswer: false,
  },

  sequence: {
    name: "u",
    type: "explicit",
    expression: "@a n + @b",
    firstTermIndex: "0",
  },

  variationTable: {
    headers: ["x", "f(x)"],
    columns: [
      { x: "-∞", variation: "" },
      { x: "@a", variation: "high" },
      { x: "+∞", variation: "" },
    ],
  },

  signTable: {
    headers: ["x", "f(x)"],
    intervals: [
      { val: "-∞", sign: "+" },
      { val: "@x1", sign: "0" },
      { val: "+∞", sign: "-" },
    ],
  },

  probaTree: {
    levels: 2,
    nodes: [], 
  },

  vector: {
    vectors: [
      { name: "u", x: "1", y: "2" },
      { name: "v", x: "-3", y: "5" },
    ],
    is3D: false,
  },

  mcq: {
    question: "Quelle est la bonne réponse ?",
    options: [
      { id: 1, text: "Réponse A", correct: true },
      { id: 2, text: "Réponse B", correct: false },
    ],
    multipleChoice: false,
  },

  question: {
    question: "Résoudre l'équation :",
    answerFormat: "equation", // 'number', 'expression', 'equation', 'interval', 'text'
    correctAnswer: "@x1; @x2", 
    points: 1
  },
};

export const getDefaultContent = (type) => {
  return defaultContent[type]
    ? JSON.parse(JSON.stringify(defaultContent[type]))
    : {};
};
