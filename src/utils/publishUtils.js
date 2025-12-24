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

  // 2. On SÉPARE les métadonnées du contenu pur
  // On extrait (remove) title, chapter, difficulty, competences de l'objet 'content'
  // Tout le reste (variables, elements...) va dans la variable 'contentOnly'
  const { 
    id, // On retire l'ID s'il y en a un (c'est la BDD qui gère l'ID)
    title, 
    chapter, 
    difficulty, 
    competences, 
    ...contentOnly // <-- C'est ici que sont variables et elements
  } = exercise;

  // 3. Préparation de la ligne SQL
  const dbRow = {
    title: title,
    chapter: chapter,
    difficulty: difficulty || 'Moyen',
    competences: competences || [],
    content: contentOnly // Le JSONB ne contient plus de titre !
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