import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

/**
 * Formatte une valeur numérique
 */
const formatValue = (value) => {
  if (value === null || value === undefined) return '';
  const numValue = typeof value === 'number' ? value : parseFloat(value);
  if (isNaN(numValue)) return String(value);
  
  return Number.isInteger(numValue) 
    ? numValue.toString() 
    : parseFloat(numValue.toFixed(4)).toString();
};

/**
 * Nettoie et simplifie une expression mathématique
 */
const cleanMathExpression = (expression) => {
  let cleaned = expression;

  // 1. Gérer le coefficient 0 (0x, 0x^2, 0\pi...) -> devient "0"
  // Regex : 0 suivi d'une lettre ou commande, et de tout ce qui suit
  cleaned = cleaned.replace(/(?<![\d.])0\s*[a-zA-Z\\][a-zA-Z0-9^_{}\\]*/g, '0');

  // 2. Gérer le coefficient 1 (1x -> x, 1\pi -> \pi)
  cleaned = cleaned.replace(/(?<![\d.])1\s*([a-zA-Z\\])/g, '$1');

  // 3. NETTOYAGE DES ZÉROS (Cœur du problème)
  
  // A. Zéros au MILIEU ou à la FIN (+ 0, - 0)
  // On enlève "+ 0" ou "- 0" s'ils ne sont pas suivis d'un point décimal
  cleaned = cleaned.replace(/[+-]\s*0(?![0-9.])/g, '');

  // B. Zéro au DÉBUT suivi d'un signe (0 + x -> + x -> x)
  // Ex: "0 + 3x" devient "+ 3x" (le + sera nettoyé à l'étape 6)
  cleaned = cleaned.replace(/^\s*0\s*([+-])/, '$1');

  // C. Zéro au DÉBUT suivi de rien (C'est juste "0") -> On garde !
  // Si c'est "0", on ne touche pas.

  // 5. GESTION DES SIGNES
  cleaned = cleaned.replace(/\+\s*-/g, '-');
  cleaned = cleaned.replace(/-\s*-/g, '+');
  cleaned = cleaned.replace(/\+\s*\+/g, '+');
  cleaned = cleaned.replace(/\+ -/g, '-');
  cleaned = cleaned.replace(/\+-/g, '-');
  cleaned = cleaned.replace(/--/g, '+');
  
  // 6. NETTOYAGE FINAL DU DÉBUT DE LIGNE
  // Enlever le "+" au tout début (ex: "+ x^2" -> "x^2")
  cleaned = cleaned.replace(/^\s*\+/, '');

  // 7. Enlever les parenthèses autour des nombres positifs isolés
  cleaned = cleaned.replace(/\((\d+\.?\d*)\)/g, '$1');

  // 8. SI TOUT EST VIDE (ex: 0x -> 0 -> vide), on remet "0"
  if (expression.trim() !== '' && cleaned.trim() === '') {
    return '0';
  }
  
  return cleaned.replace(/\s+/g, ' ').trim();
};

/**
 * Remplace @variable par sa valeur et nettoie le résultat
 */
export const replaceVariables = (text, variables = {}) => {
  if (typeof text !== 'string') return String(text || '');
  if (!variables || Object.keys(variables).length === 0) return text.replace(/@@/g, '@');

  let result = text.replace(/@@/g, '##ESCAPED_AT##');
  
  const sortedKeys = Object.keys(variables).sort((a, b) => b.length - a.length);
  
  sortedKeys.forEach(key => {
    const value = variables[key];
    const numValue = typeof value === 'number' ? value : parseFloat(value);
    
    // Regex : Cherche @nom avec contexte
    const regex = new RegExp(`([+\\-]?)(\\s*)@${key}(?![a-zA-Z0-9_])`, 'g');
    
    result = result.replace(regex, (match, sign, space) => {
      if (isNaN(numValue)) return (sign || '') + (space || '') + formatValue(value);

      const formattedAbs = formatValue(Math.abs(numValue));

      if (sign === '+') {
        if (numValue < 0) return `${space}- ${formattedAbs}`;
        return `${space}+ ${formattedAbs}`;
      } 
      else if (sign === '-') {
        if (numValue < 0) return `${space}+ ${formattedAbs}`;
        return `${space}- ${formattedAbs}`;
      }
      
      if (numValue < 0) return `${space}-${formattedAbs}`;
      
      return (sign || '') + (space || '') + formatValue(value);
    });
  });

  result = result.replace(/##ESCAPED_AT##/g, '@');
  
  return cleanMathExpression(result);
};

// Alias pour compatibilité
export const replaceVariablesWithBraces = replaceVariables;
export const replaceVariablesWithoutBraces = replaceVariables;

/**
 * Composant MathText
 */
export const MathText = ({ content, variables = {}, className = '', displayMode = false }) => {
  const textContent = String(content || '');
  if (!textContent) return null;
  
  const processedContent = replaceVariables(textContent, variables);
  
  const parts = [];
  const regex = /\$\$([\s\S]*?)\$\$|\$(.*?)\$/g;
  let lastIndex = 0;
  let match;
  let key = 0;
  
  while ((match = regex.exec(processedContent)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={`text-${key++}`}>{processedContent.substring(lastIndex, match.index)}</span>);
    }
    
    const isBlock = !!match[1];
    const formula = match[1] || match[2];
    
    if (formula) {
      if (isBlock || displayMode) {
        parts.push(<BlockMath key={`math-${key++}`} math={formula} />);
      } else {
        parts.push(<InlineMath key={`math-${key++}`} math={formula} />);
      }
    }
    lastIndex = match.index + match[0].length;
  }
  
  if (lastIndex < processedContent.length) {
    parts.push(<span key={`text-${key++}`}>{processedContent.substring(lastIndex)}</span>);
  }
  
  if (parts.length === 0) return <span className={className}>{processedContent}</span>;
  
  return <div className={className}>{parts}</div>;
};

export const Latex = ({ children, variables = {}, display = false, className = '' }) => {
  const processed = replaceVariables(children, variables);
  return display ? <BlockMath math={processed} /> : <InlineMath math={processed} />;
};

export default MathText;