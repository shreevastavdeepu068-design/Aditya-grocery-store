import { supabase } from './supabase';

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
  created_at?: string;
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error loading categories:', error);
    return [];
  }

  return data as Category[];
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error loading category:', error);
    return null;
  }

  return data as Category;
}

export async function createCategory(category: Omit<Category, 'id'>) {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateCategory(
  id: string,
  updates: Partial<Category>
) {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteCategory(id: string) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) throw error;

  return true;
}
