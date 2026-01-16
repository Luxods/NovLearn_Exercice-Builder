import { supabase } from '../supabaseClient';

/**
 * Récupère la liste simplifiée des exercices
 * AJOUT : On récupère aussi 'app_title' pour l'afficher éventuellement
 */
export const fetchExercisesList = async () => {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('id, title, app_title, chapter, difficulty, created_at') // <--- Ajout app_title
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error("Erreur fetch list:", err);
    return { success: false, error: err.message };
  }
};

/**
 * Récupère un exercice complet
 */
export const fetchFullExercise = async (id) => {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    const formattedExercise = {
      id: data.id,
      title: data.title,
      // MAPPING : De la base (snake_case) vers l'app (camelCase)
      // Si app_title est vide (vieux exos), on met le title par défaut
      appTitle: data.app_title || data.title, 
      chapter: data.chapter,
      difficulty: data.difficulty,
      competences: data.competences || [],
      ...data.content // Le reste (variables, elements...)
    };

    return { success: true, data: formattedExercise };
  } catch (err) {
    console.error("Erreur fetch one:", err);
    return { success: false, error: err.message };
  }
};

/**
 * Supprime un exercice
 */
export const deleteExerciseFromDB = async (id) => {
  try {
    const { error } = await supabase
      .from('exercises')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Erreur suppression:", err);
    return { success: false, error: err.message };
  }
};

/**
 * Publie ou Met à jour l'exercice
 */
export const publishExerciseToDB = async (exercise) => {
  if (!exercise.title || !exercise.chapter) {
    return { success: false, error: "Titre et Chapitre requis." };
  }

  // On extrait appTitle pour le mettre dans sa propre colonne
  const { 
    id, 
    title, 
    appTitle, 
    chapter, 
    difficulty, 
    competences, 
    ...contentOnly 
  } = exercise;

  // Préparation de la ligne BDD
  const dbRow = {
    title,
    app_title: appTitle || title, // <--- Enregistrement dans la colonne dédiée
    chapter,
    difficulty: difficulty || 'Moyen',
    competences: competences || [],
    content: contentOnly
  };

  try {
    let result;
    
    // UPDATE
    if (id) {
      result = await supabase
        .from('exercises')
        .update(dbRow)
        .eq('id', id)
        .select();
      
      if (!result.error && result.data && result.data.length === 0) {
        return { 
          success: false, 
          error: "Mise à jour refusée par Supabase. Vérifiez les droits." 
        };
      }
    } 
    // INSERT
    else {
      result = await supabase
        .from('exercises')
        .insert([dbRow])
        .select();
    }

    if (result.error) throw result.error;
    if (!result.data || result.data.length === 0) throw new Error("Aucune donnée retournée.");

    return { success: true, data: result.data[0] };
  } catch (err) {
    console.error("Erreur Supabase:", err);
    return { success: false, error: err.message };
  }
};