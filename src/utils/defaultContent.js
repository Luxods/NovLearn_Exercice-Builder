/**
 * Fournit le contenu par défaut lors de la création d'un nouvel élément
 * Utilise la syntaxe @variable pour être cohérent avec le reste du projet.
 */
export const defaultContent = {
  text: {
    text: "Soit une fonction $f$ définie sur @I...",
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

  variationTable: {
    variable: "x",
    function: "f(x)",
    points: [
      { x: "-\\infty", y: "+\\infty", pos: "top" },
      { x: "@a", y: "0", pos: "bottom" },
      { x: "+\\infty", y: "+\\infty", pos: "top" },
    ],
  },

  signTable: {
    variable: "x",
    function: "f(x)",
    points: [
      { x: "-\\infty", type: "boundary" },
      { x: "@x_1", type: "zero" },
      { x: "+\\infty", type: "boundary" },
    ],
    signs: ["+", "-"],
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
    answerFormat: "set", // 'number', 'expression', 'equation', 'interval', 'text'
    correctAnswer: "@x1; @x2",
    points: 1,
  },
};

export const getDefaultContent = (type) => {
  return defaultContent[type]
    ? JSON.parse(JSON.stringify(defaultContent[type]))
    : {};
};
