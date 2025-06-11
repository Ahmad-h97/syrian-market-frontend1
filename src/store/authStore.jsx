import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // to save token in memory and lose in refresh


export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
       userId: null, 
       user: null,   
      setAuthData: ({ token, id, user }) => set({ accessToken: token, userId: id,user }),
      setAccessToken: (token) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: null }),
      clearAuth: () => set({  userId: null ,accessToken: null, user: null }),
    }),
  {
    name:'auth-storage',
  }
));