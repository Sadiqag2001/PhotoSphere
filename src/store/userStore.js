import { create } from "zustand";

const USER_STORAGE_KEY = "photosphere_user";
const FAVS_STORAGE_KEY = "photosphere_favourites";

export const useUserStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem(USER_STORAGE_KEY)) || null,
  favourites: JSON.parse(localStorage.getItem(FAVS_STORAGE_KEY)) || [],

  login: (user) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    set({ user });
  },

  logout: () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(FAVS_STORAGE_KEY);
    set({ user: null, favourites: [] });
  },

  addFavourite: (photo) => {
    const currentFavs = get().favourites;
    if (!currentFavs.find((p) => p.id === photo.id)) {
      const newFavs = [...currentFavs, photo];
      localStorage.setItem(FAVS_STORAGE_KEY, JSON.stringify(newFavs));
      set({ favourites: newFavs });
    }
  },

  removeFavourite: (id) => {
    const newFavs = get().favourites.filter((p) => p.id !== id);
    localStorage.setItem(FAVS_STORAGE_KEY, JSON.stringify(newFavs));
    set({ favourites: newFavs });
  },
}));
