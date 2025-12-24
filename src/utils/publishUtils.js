import { supabase } from '../supabaseClient';

/**
 * Publie l'exercice dans la base de données Supabase
 * @param {Object} exercise - L'objet exercice complet
 */
export const publishExerciseToDB = async (exercise) => {
  // 1. Validation basique
  if (!exercise.title || !exercise.chapter) {
    return { success: false, error: "Titre et Chapitre requis." };
  }

  // 2. Préparation de l'objet pour la BDD
  // On extrait les métadonnées pour les colonnes SQL, et on garde tout le reste dans 'content'
  const dbRow = {
    title: exercise.title,
    chapter: exercise.chapter,
    difficulty: exercise.difficulty || 'Moyen', // Valeur par défaut
    competences: exercise.competences || [],
    content: exercise // On stocke TOUT l'objet JSON dans la colonne jsonb
  };

  try {
    const { data, error } = await supabase
      .from('exercises')
      .insert([dbRow])
      .select();

    if (error) throw error;

    return { success: true, data: data[0] };
  } catch (err) {
    console.error("Erreur Supabase:", err);
    return { success: false, error: err.message };
  }
};