# 📐 Guide d'utilisation de LaTeX dans Exercise Builder

## 🎯 Vue d'ensemble

Tous les éditeurs supportent la syntaxe LaTeX pour créer des expressions mathématiques professionnelles. Ce guide vous montre comment les utiliser efficacement.

## 📝 Syntaxe de base

### 1. LaTeX inline (dans le texte)
Utilisez `$...$` pour insérer des formules mathématiques dans le texte :
```
Calculer $f(x) = x^2 + 3x + 2$
```

### 2. Variables dynamiques
Utilisez `{nomVariable}` pour les valeurs qui changeront :
```
Résoudre l'équation ${a}x^2 + {b}x + {c} = 0$
```

### 3. Combiner les deux
```
Soit la fonction $f(x) = {a}x^2 + {b}x + {c}$. Calculer $f({d})$.
```

## 🔢 Symboles mathématiques courants

### Opérations de base
- Puissance : `x^2` → $x^2$
- Indice : `x_n` → $x_n$
- Fraction : `\frac{a}{b}` → $\frac{a}{b}$
- Racine carrée : `\sqrt{x}` → $\sqrt{x}$
- Racine n-ième : `\sqrt[n]{x}` → $\sqrt[n]{x}$

### Fonctions trigonométriques
- `\sin(x)` → $\sin(x)$
- `\cos(x)` → $\cos(x)$
- `\tan(x)` → $\tan(x)$
- `\arcsin(x)` → $\arcsin(x)$

### Fonctions logarithmiques et exponentielles
- `e^x` → $e^x$
- `\ln(x)` → $\ln(x)$
- `\log(x)` → $\log(x)$

### Symboles grecs
- Alpha : `\alpha` → $\alpha$
- Beta : `\beta` → $\beta$
- Delta : `\Delta` → $\Delta$
- Theta : `\theta` → $\theta$
- Pi : `\pi` → $\pi$
- Sigma : `\Sigma` → $\Sigma$

### Opérateurs et symboles
- Multiplication : `\times` → $\times$
- Division : `\div` → $\div$
- Plus ou moins : `\pm` → $\pm$
- Infini : `\infty` → $\infty$
- Approximativement : `\approx` → $\approx$
- Différent de : `\neq` → $\neq$
- Inférieur ou égal : `\leq` → $\leq$
- Supérieur ou égal : `\geq` → $\geq$

### Ensembles et logique
- Appartient à : `\in` → $\in$
- N'appartient pas à : `\notin` → $\notin$
- Ensemble vide : `\emptyset` → $\emptyset$
- Union : `\cup` → $\cup$
- Intersection : `\cap` → $\cap$
- Pour tout : `\forall` → $\forall$
- Il existe : `\exists` → $\exists$

### Nombres spéciaux
- Entiers naturels : `\mathbb{N}` → $\mathbb{N}$
- Entiers relatifs : `\mathbb{Z}` → $\mathbb{Z}$
- Rationnels : `\mathbb{Q}` → $\mathbb{Q}$
- Réels : `\mathbb{R}` → $\mathbb{R}$
- Complexes : `\mathbb{C}` → $\mathbb{C}$

## 📚 Exemples par type d'élément

### TextEditor
```
Soit $f(x) = {a}x^2 + {b}x + {c}$ une fonction du second degré.
Calculer $\Delta = b^2 - 4ac$ où $a = {a}$, $b = {b}$ et $c = {c}$.
```

### FunctionEditor
```
Expression: {a}\sin(x) + {b}\cos(x)
Expression: \frac{{a}x + {b}}{{c}x + {d}}
Expression: {a}e^{{b}x}
```

### EquationEditor
```
Simple: {a}x^2 + {b}x + {c} = 0
Fraction: \frac{{a}}{{b}}x + \frac{{c}}{{d}} = {e}
Racine: \sqrt{{a}x + {b}} = {c}
```

Système:
```
\begin{cases}
{a}x + {b}y = {c} \\
{d}x + {e}y = {f}
\end{cases}
```

### SequenceEditor
```
Explicite: U_n = {a}n^2 + {b}n + {c}
Récurrence: U_{n+1} = {a}U_n + {b}
Géométrique: U_n = {u0} \times {q}^n
```

### QuestionEditor
```
Quelle est la limite de $\lim_{x \to \infty} \frac{{a}x + {b}}{{c}x + {d}}$ ?
Calculer $\int_{{a}}^{{b}} x^2 dx$.
Résoudre dans $\mathbb{R}$ : $|x - {a}| < {b}$.
```

### MCQEditor
Options avec LaTeX:
```
Question: Quelle est la dérivée de $f(x) = {a}x^3$ ?
Réponses:
- ${3a}x^2$ (correct)
- ${a}x^2$
- $3x^2$
- ${a}x^3$
```

## ⚠️ Pièges courants

### 1. Accolades pour variables vs LaTeX
```
✅ Correct: {a}x^2 + {b}x + {c}
❌ Incorrect: ax^2 + bx + c (les variables ne seront pas remplacées)
```

### 2. Espaces dans les formules
```
✅ Correct: \frac{{a}}{{b}}
❌ Incorrect: \frac{a}{b} (sans accolades, 'a' et 'b' ne sont pas des variables)
```

### 3. Parenthèses dans les accolades
```
✅ Correct: {a}^{n+1}
❌ Incorrect: {a}^n+1 (seulement n sera en exposant)
```

### 4. Systèmes d'équations
```
✅ Correct: 
\begin{cases}
{a}x + {b}y = {c} \\
{d}x + {e}y = {f}
\end{cases}

❌ Incorrect: Oublier \\ entre les lignes
```

## 🎨 Formatage avancé

### Matrices
```
\begin{pmatrix}
{a} & {b} \\
{c} & {d}
\end{pmatrix}
```

### Vecteurs
```
\vec{u} = \begin{pmatrix} {a} \\ {b} \end{pmatrix}
```

### Dérivées
```
f'(x) = {a}x + {b}
\frac{df}{dx} = {a}x + {b}
```

### Intégrales
```
\int_{a}^{b} f(x)dx
\int {a}x^2 + {b}x dx = \frac{{a}}{3}x^3 + \frac{{b}}{2}x^2 + C
```

### Limites
```
\lim_{x \to {a}} f(x) = {L}
\lim_{x \to +\infty} \frac{{a}x}{{b}x + {c}} = \frac{{a}}{{b}}
```

### Sommes et produits
```
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
\prod_{i=1}^{n} i = n!
```

## 💡 Conseils pratiques

1. **Testez vos formules** : Utilisez l'aperçu pour vérifier le rendu
2. **Variables cohérentes** : Utilisez les mêmes noms de variables partout
3. **Simplifiez** : Préférez les expressions simples et claires
4. **Documentation** : Consultez [KaTeX documentation](https://katex.org/docs/supported.html) pour plus de symboles

## 🔗 Ressources

- Documentation KaTeX : https://katex.org/docs/supported.html
- Éditeur LaTeX en ligne : https://www.codecogs.com/latex/eqneditor.php
- Symboles mathématiques : https://www.overleaf.com/learn/latex/List_of_Greek_letters_and_math_symbols
