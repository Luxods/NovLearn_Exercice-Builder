import { mathModules } from './mathmodules'; // IMPORT DU MODULE

export const generateRandomValues = (variables) => {
  const scope = {};

  // 1. Variables Aléatoires (Rien ne change ici)
  const randomVars = variables.filter(v => v.type !== 'computed');
  
  randomVars.forEach(v => {
    if (!v.name) return;

    let excludedValues = [];
    if (v.exclusions) {
      excludedValues = String(v.exclusions)
        .split(/[;,]/)
        .map(s => parseFloat(s.trim()))
        .filter(n => !isNaN(n));
    }

    let val;
    let isValid = false;
    let attempts = 0;
    const MAX_ATTEMPTS = 50;

    while (!isValid && attempts < MAX_ATTEMPTS) {
      attempts++;
      switch (v.type) {
        case 'integer':
          const minI = v.min ?? 1;
          const maxI = v.max ?? 10;
          val = Math.floor(Math.random() * (maxI - minI + 1)) + minI;
          break;
        case 'decimal':
          const minD = v.min ?? 0;
          const maxD = v.max ?? 10;
          const raw = Math.random() * (maxD - minD) + minD;
          val = parseFloat(raw.toFixed(v.decimals ?? 2));
          break;
        case 'choice':
          const choices = v.choices || [];
          val = choices.length ? choices[Math.floor(Math.random() * choices.length)] : '';
          break;
        default:
          val = '';
      }

      if (v.type === 'integer' || v.type === 'decimal') {
        const isExcluded = excludedValues.some(ex => Math.abs(ex - val) < 0.0000001);
        if (!isExcluded) isValid = true;
      } else {
        isValid = true;
      }
    }
    scope[v.name] = isValid ? val : (v.min ?? 0);
  });

  // 2. Variables CALCULÉES (AVEC LES MODULES)
  let computedVars = variables.filter(v => v.type === 'computed');
  let hasChanges = true;
  let loops = 0;

  while (computedVars.length > 0 && hasChanges && loops < 10) {
    hasChanges = false;
    const remaining = [];

    computedVars.forEach(v => {
      try {
        // A. Préparation du Scope (Variables + Modules)
        const scopeKeys = Object.keys(scope);
        const scopeValues = Object.values(scope);
        
        // On ajoute nos supers fonctions au scope
        const moduleKeys = Object.keys(mathModules);
        const moduleValues = Object.values(mathModules);

        const allKeys = [...scopeKeys, ...moduleKeys];
        const allValues = [...scopeValues, ...moduleValues];

        // B. Nettoyage de l'expression
        // 1. Remplacer les maths standards
        let safeExpr = replaceMathFunctions(v.expression);
        
        // 2. SUPPRESSION DES @ pour le JS
        // "root1(@a, @b)" devient "root1(a, b)"
        safeExpr = safeExpr.replace(/@/g, ''); 

        // C. Exécution sécurisée
        const func = new Function(...allKeys, 'return ' + safeExpr);
        const result = func(...allValues);
        
        if (result !== undefined && !isNaN(result)) {
          // On évite les erreurs d'arrondi JS (0.300000004)
          scope[v.name] = parseFloat(Number(result).toPrecision(12)); 
          hasChanges = true;
        } else {
          remaining.push(v);
        }
      } catch (e) {
        remaining.push(v);
      }
    });

    computedVars = remaining;
    loops++;
  }

  return scope;
};

// Helper classique
const replaceMathFunctions = (expr) => {
  if (!expr) return '0';
  let res = expr;
  res = res.replace(/\bsqrt\b/g, 'Math.sqrt');
  res = res.replace(/\bsin\b/g, 'Math.sin');
  res = res.replace(/\bcos\b/g, 'Math.cos');
  res = res.replace(/\btan\b/g, 'Math.tan');
  res = res.replace(/\babs\b/g, 'Math.abs');
  res = res.replace(/\bPI\b/g, 'Math.PI');
  res = res.replace(/\^/g, '**'); 
  return res;
};