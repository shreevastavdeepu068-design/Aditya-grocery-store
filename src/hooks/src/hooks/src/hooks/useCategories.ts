'use client';

import { useEffect, useState } from 'react';
import { getCategories } from '@/lib/categories';

export function useCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories', error);
    } finally {
      setLoading(false);
    }
  }

  return {
    categories,
    loading,
    refresh: loadCategories,
  };
}
