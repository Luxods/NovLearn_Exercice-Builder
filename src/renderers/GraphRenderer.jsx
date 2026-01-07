import React, { useEffect, useRef } from 'react';
import { replaceVariables } from '../utils/mathRenderer';
// On a besoin d'évaluer les expressions pour tracer (on réutilise evaluateExpression)
import { evaluateExpression } from '../utils/evaluateExpression';

// Note: Ceci est une version simplifiée utilisant Canvas. 
// Dans un vrai projet, utilisez Recharts ou JSXGraph.
const GraphRenderer = ({ content, variables }) => {
  const canvasRef = useRef(null);
  
  const width = 400;
  const height = 300;
  
  // Bornes (valeurs par défaut si non définies)
  const xMin = content.xMin ?? -5;
  const xMax = content.xMax ?? 5;
  const yMin = content.yMin ?? -5;
  const yMax = content.yMax ?? 5;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Reset
    ctx.clearRect(0, 0, width, height);
    
    // Echelles
    const xScale = width / (xMax - xMin);
    const yScale = height / (yMax - yMin);
    
    const toScreenX = (x) => (x - xMin) * xScale;
    const toScreenY = (y) => height - (y - yMin) * yScale;
    
    // 1. Grille et Axes
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    // Grille verticale
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      const sx = toScreenX(x);
      ctx.moveTo(sx, 0); ctx.lineTo(sx, height);
    }
    // Grille horizontale
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      const sy = toScreenY(y);
      ctx.moveTo(0, sy); ctx.lineTo(width, sy);
    }
    ctx.stroke();
    
    // Axes principaux
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Axe Y (x=0)
    if (xMin <= 0 && xMax >= 0) {
      const sx = toScreenX(0);
      ctx.moveTo(sx, 0); ctx.lineTo(sx, height);
    }
    // Axe X (y=0)
    if (yMin <= 0 && yMax >= 0) {
      const sy = toScreenY(0);
      ctx.moveTo(0, sy); ctx.lineTo(width, sy);
    }
    ctx.stroke();

    // 2. Tracer les fonctions
    if (content.functions) {
      content.functions.forEach(fn => {
        if (!fn.expression) return;
        
        ctx.strokeStyle = fn.color || '#2563eb';
        ctx.lineWidth = 2;
        ctx.beginPath();

        // On prépare l'expression en remplaçant les @variables
        // Attention : replaceVariables renvoie du LaTeX "propre" (3x - 5)
        // Mais pour l'évaluation JS, on a besoin de format JS (3*x - 5)
        // C'est le rôle de evaluateExpression qui gère les @vars pour le calcul
        // On crée une petite fonction locale pour évaluer f(x)
        const getY = (x) => {
          // On ajoute x aux variables pour l'évaluation
          const evalVars = { ...variables, x };
          // evaluateExpression doit retourner un nombre
          try {
            // Astuce : evaluateExpression renvoie une string, on la convertit via new Function
            // OU BIEN on utilise une lib comme mathjs. Ici on fait simple.
            const exprWithVars = evaluateExpression(fn.expression, evalVars);
            // On convertit les syntaxes math courantes pour JS
            const jsExpr = exprWithVars
              .replace(/\^/g, '**')
              .replace(/(\d)x/g, '$1*x') // 2x -> 2*x
              .replace(/x/g, `(${x})`);  // substitution brute de x
            
            return new Function(`return ${jsExpr}`)();
          } catch (e) {
            return NaN;
          }
        };

        // Tracé point par point
        let first = true;
        const step = (xMax - xMin) / width; // 1 pixel par step
        
        for (let x = xMin; x <= xMax; x += step) {
          const y = getY(x);
          if (isNaN(y)) {
            first = true;
            continue;
          }
          
          const sx = toScreenX(x);
          const sy = toScreenY(y);
          
          // Clip visuel simple
          if (sy < -100 || sy > height + 100) {
            first = true;
            continue;
          }

          if (first) {
            ctx.moveTo(sx, sy);
            first = false;
          } else {
            ctx.lineTo(sx, sy);
          }
        }
        ctx.stroke();
      });
    }
    
  }, [content, variables, width, height, xMin, xMax, yMin, yMax]);

  return (
    <div className="flex justify-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height} 
        className="border border-gray-200 rounded bg-white"
      />
    </div>
  );
};

export default GraphRenderer;