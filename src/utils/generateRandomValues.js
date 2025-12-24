/**
 * Génère les valeurs des variables (Aléatoires + Calculées)
 * @param {Array} variables - Liste des définitions de variables
 */
export const generateRandomValues = (variables) => {
  const scope = {}; // Stocke les valeurs finales { a: 1, b: 2 }

  // 1. D'abord les variables PUREMENT ALÉATOIRES
  const randomVars = variables.filter(v => v.type !== 'computed');
  
  randomVars.forEach(v => {
    if (!v.name) return;
    
    // Ta logique existante pour les types integer, decimal, choice...
    switch (v.type) {
      case 'integer':
        const minI = v.min ?? 1;
        const maxI = v.max ?? 10;
        scope[v.name] = Math.floor(Math.random() * (maxI - minI + 1)) + minI;
        break;
      case 'decimal':
        const minD = v.min ?? 0;
        const maxD = v.max ?? 10;
        const raw = Math.random() * (maxD - minD) + minD;
        scope[v.name] = parseFloat(raw.toFixed(v.decimals ?? 2));
        break;
      case 'choice':
        const choices = v.choices || [];
        scope[v.name] = choices.length ? choices[Math.floor(Math.random() * choices.length)] : '';
        break;
      default:
        scope[v.name] = '';
    }
  });

  // 2. Ensuite les variables CALCULÉES (en fonction des autres)
  let computedVars = variables.filter(v => v.type === 'computed');
  let hasChanges = true;
  let loops = 0;

  // On boucle tant qu'on arrive à résoudre de nouvelles variables
  // (ça gère automatiquement l'ordre: si Z dépend de Y qui dépend de X)
  while (computedVars.length > 0 && hasChanges && loops < 10) {
    hasChanges = false;
    const remaining = [];

    computedVars.forEach(v => {
      try {
        // On prépare l'expression
        // Exemple: "a + b" devient une fonction JS
        const keys = Object.keys(scope);
        const values = Object.values(scope);
        
        // On vérifie si on a toutes les variables nécessaires
        // (Une analyse regex simple pour voir si les mots utilisés sont dans le scope)
        // Note: C'est optionnel, le try/catch capture l'erreur sinon, mais c'est plus propre.
        
        // Astuce : on injecte Math pour pouvoir écrire 'sqrt(x)' directement
        const func = new Function(
          ...keys, 
          'return ' + replaceMathFunctions(v.expression)
        );
        
        const result = func(...values);
        
        // Si le résultat est valide (pas NaN ni undefined)
        if (result !== undefined && !isNaN(result)) {
          // On arrondit un peu pour éviter les 0.30000000004
          scope[v.name] = parseFloat(Number(result).toPrecision(10));
          hasChanges = true; // On a avancé !
        } else {
          remaining.push(v);
        }
      } catch (e) {
        // Probablement qu'une variable dépendante manque encore, on retente au prochain tour
        remaining.push(v);
      }
    });

    computedVars = remaining;
    loops++;
  }

  return scope;
};

// Petit helper pour remplacer sin() par Math.sin() etc. sans mathjs
// Repris de ton GraphRenderer existant pour la cohérence
const replaceMathFunctions = (expr) => {
  if (!expr) return '0';
  let res = expr;
  // Ajoute ici tes fonctions préférées
  res = res.replace(/\bsqrt\b/g, 'Math.sqrt');
  res = res.replace(/\bsin\b/g, 'Math.sin');
  res = res.replace(/\bcos\b/g, 'Math.cos');
  res = res.replace(/\btan\b/g, 'Math.tan');
  res = res.replace(/\babs\b/g, 'Math.abs');
  res = res.replace(/\bPI\b/g, 'Math.PI');
  res = res.replace(/\^/g, '**'); // Support de la puissance ^ comme en Python/Latex
  return res;
};