// src/utils/publishUtils.js

const API_URL = import.meta.env.VITE_NOVLEARN_API_URL;
const ADMIN_SECRET = import.meta.env.VITE_ADMIN_SECRET;

// Petit helper pour gérer les erreurs API proprement
const handleApiResponse = async (response) => {
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || "Erreur API inconnue");
  }
  return result;
};

/**
 * Récupère la liste simplifiée des exercices via l'API Novlearn
 */
export const fetchExercisesList = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    // L'API renvoie { success: true, exercises: [...] }
    const result = await handleApiResponse(response);
    return { success: true, data: result.exercises };

  } catch (err) {
    console.error("Erreur fetch list:", err);
    return { success: false, error: err.message };
  }
};

/**
 * Récupère un exercice complet via l'API Novlearn
 */
export const fetchFullExercise = async (id) => {
  try {
    const response = await fetch(`${API_URL}?id=${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    // L'API renvoie { success: true, data: formattedExercise }
    // Note : L'API fait déjà le formatage (appTitle, spread content...), 
    // donc on récupère direct l'objet prêt à l'emploi.
    const result = await handleApiResponse(response);
    return { success: true, data: result.data };

  } catch (err) {
    console.error("Erreur fetch one:", err);
    return { success: false, error: err.message };
  }
};

/**
 * Supprime un exercice via l'API (Nécessite le Secret)
 */
export const deleteExerciseFromDB = async (id) => {
  try {
    const response = await fetch(`${API_URL}?id=${id}`, {
      method: 'DELETE',
      headers: {
        'x-admin-secret': ADMIN_SECRET // 🔐 Authentification machine
      }
    });

    await handleApiResponse(response);
    return { success: true };

  } catch (err) {
    console.error("Erreur suppression:", err);
    return { success: false, error: err.message };
  }
};

/**
 * Publie ou Met à jour l'exercice via l'API (Nécessite le Secret)
 */
export const publishExerciseToDB = async (exercise) => {
  if (!exercise.title || !exercise.chapter) {
    return { success: false, error: "Titre et Chapitre requis." };
  }

  // 1. Préparation des données (Identique à ton ancienne logique)
  const {
    id,
    title,
    appTitle,
    chapter,
    difficulty,
    competences,
    Is_Flash,
    Need_Calculator,
    ...contentOnly
  } = exercise;

  // On reconstruit l'objet tel qu'attendu par la table Supabase
  const dbRow = {
    // Si on a un ID, on le met pour que l'API fasse un UPDATE, sinon ce sera un INSERT
    ...(id && { id }),
    title,
    app_title: appTitle || title,
    chapter,
    difficulty: difficulty || 'Moyen',
    competences: competences || [],
    Is_Flash: Is_Flash ?? false,
    Need_Calculator: Need_Calculator ?? false,
    content: contentOnly // Le JSON pur du contenu
  };

  try {
    // 2. Envoi à l'API (POST gère Upsert)
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': ADMIN_SECRET // 🔐 Authentification machine
      },
      body: JSON.stringify(dbRow)
    });

    const result = await handleApiResponse(response);
    return { success: true, data: result.data };

  } catch (err) {
    console.error("Erreur Publication API:", err);
    return { success: false, error: err.message };
  }
};