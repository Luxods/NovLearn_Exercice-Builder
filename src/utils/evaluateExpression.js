export const evaluateExpression = (expression, variables = {}) => {
  // Gestion sûre des types
  if (expression === null || expression === undefined) {
    return '';
  }
  
  // Convertir en string
  let result = typeof expression === 'string' 
    ? expression 
    : expression.toString();

  // 1. Protection échappement @@ -> Placeholder
  result = result.replace(/@@/g, '##ESCAPED_AT##');
  
  // 2. Remplacer les variables (Ordre: plus longues d'abord)
  const sortedKeys = Object.keys(variables).sort((a, b) => b.length - a.length);

  sortedKeys.forEach(key => {
    // Regex: @nom suivi de "pas lettre/chiffre/underscore"
    const regex = new RegExp(`@${key}(?![a-zA-Z0-9_])`, 'g');
    const value = variables[key];
    
    let formattedValue;
    if (value === null || value === undefined) {
      formattedValue = '';
    } else if (typeof value === 'number') {
      // Pour l'évaluation, on préfère garder plus de précision, 
      // mais attention aux nombres flottants JS.
      formattedValue = value.toString();
      // Si c'est négatif, on entoure de parenthèses pour sécuriser l'évaluation (ex: x^2 avec x=-2 -> (-2)^2)
      if (value < 0) {
        formattedValue = `(${value})`;
      }
    } else {
      formattedValue = value.toString();
    }
    
    result = result.replace(regex, formattedValue);
  });
  
  // 3. Restaurer le @
  result = result.replace(/##ESCAPED_AT##/g, '@');

  return result;
};