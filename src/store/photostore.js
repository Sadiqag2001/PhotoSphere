import { create } from "zustand";
import axios from "axios";

const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

export const usePhotoStore = create((set, get) => ({
  photos: [],
  page: 1, 
  favourites: JSON.parse(localStorage.getItem("favourites")) || [],

  searchPhotos: async (query) => {
    try {
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&per_page=12`,
        {
          headers: { Authorization: apiKey },
        }
      );
      set({ photos: res.data.photos });
    } catch (err) {
      console.error("Error searching photos:", err);
    }
  },

  fetchTrending: async () => {
    try {
      const res = await axios.get(
        `https://api.pexels.com/v1/curated?per_page=12`,
        {
          headers: { Authorization: apiKey },
        }
      );
      set({ photos: res.data.photos });
    } catch (err) {
      console.error("Error fetching trending photos:", err);
    }
  },

  fetchExplore: async (page = 1) => {
    try {
      const res = await axios.get(
        `https://api.pexels.com/v1/curated?page=${page}&per_page=12`,
        { headers: { Authorization: apiKey } }
      );

      if (page === 1) {
        set({ photos: res.data.photos, page: 1 });
      } else {
        set((state) => ({
          photos: [...state.photos, ...res.data.photos],
          page,
        }));
      }
    } catch (err) {
      console.error("Error fetching explore photos:", err);
    }
  },

  loadMoreExplore: async () => {
    const { page } = get();
    await get().fetchExplore(page + 1);
  },


  toggleFavourite: (photo) => {
    const state = get();
    const isFavourite = state.favourites.some((fav) => fav.id === photo.id);

    const updated = isFavourite
      ? state.favourites.filter((fav) => fav.id !== photo.id)
      : [...state.favourites, photo];

    localStorage.setItem("favourites", JSON.stringify(updated));
    set({ favourites: updated });
  },
}));
