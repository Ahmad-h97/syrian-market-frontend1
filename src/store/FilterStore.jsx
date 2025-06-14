import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const FilterStore = create(
  persist(
    (set) => ({
      filters: {
        location: '',
        title: '',
        maxPrice: '',
        minPrice: '',
        date: '',
      },

      setFilters: (newFilters) => set({ filters: newFilters }),

      updateFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      clearFilters: () =>
        set({
          filters: {
            location: '',
            title: '',
            maxPrice: '',
            minPrice: '',
            date: '',
          },
        }),
    }),
    {
      name: 'filter-storage', // name of item in localStorage
    }
  )
);
