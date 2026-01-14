import { supabase } from '../supabaseClient';

export const fetchExercisesList = async () => {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('id, title, chapter, difficulty, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error("Erreur fetch list:", err);
    return { success: false, error: err.message };
  }
};

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
      chapter: data.chapter,
      difficulty: data.difficulty,
      competences: data.competences || [],
      ...data.content
    };

    return { success: true, data: formattedExercise };
  } catch (err) {
    console.error("Erreur fetch one:", err);
    return { success: false, error: err.message };
  }
};

export const publishExerciseToDB = async (exercise) => {
  if (!exercise.title || !exercise.chapter) {
    return { success: false, error: "Titre et Chapitre requis." };
  }

  const { 
    id, 
    title, 
    chapter, 
    difficulty, 
    competences, 
    ...contentOnly 
  } = exercise;

  const dbRow = {
    title,
    chapter,
    difficulty: difficulty || 'Moyen',
    competences: competences || [],
    content: contentOnly
  };

  try {
    let result;
    
    // CAS 1 : MISE À JOUR (UPDATE)
    if (id) {
      result = await supabase
        .from('exercises')
        .update(dbRow)
        .eq('id', id)
        .select();
      
      // --- C'EST ICI QUE LE FIX SE TROUVE ---
      // Si la mise à jour ne renvoie aucune ligne (souvent un problème de droits)
      if (!result.error && result.data && result.data.length === 0) {
        return { 
          success: false, 
          error: "Mise à jour échouée. Vérifiez que la Policy RLS pour 'UPDATE' est active sur Supabase." 
        };
      }
    } 
    // CAS 2 : CRÉATION (INSERT)
    else {
      result = await supabase
        .from('exercises')
        .insert([dbRow])
        .select();
    }

    if (result.error) throw result.error;

    return { success: true, data: result.data[0] };
  } catch (err) {
    console.error("Erreur Supabase:", err);
    return { success: false, error: err.message };
  }
};