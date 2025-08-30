import { create } from "zustand";
import axios from "axios";
import { useUserStore } from "./userStore";

const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

export const usePhotoStore = create((set, get) => ({
  photos: [],
  page: 1, 
  favourites: JSON.parse(localStorage.getItem("favourites")) || [],
  lastQuery: localStorage.getItem("lastQuery") || "",

  searchPhotos: async (query) => {
    try {
      const res = await axios.get(
        `https://api.pexels.com/v1/search?query=${query}&per_page=15`,
        {
          headers: { Authorization: apiKey },
        }
      );
     set({ photos: res.data.photos, lastQuery: query });

      localStorage.setItem("searchPhotos", JSON.stringify(res.data.photos));
      localStorage.setItem("lastQuery", query);
    } catch (err) {
      console.error("Error searching photos:", err);
    }
  },

  clearSearch: () => {
    set({ photos: [], lastQuery: "" });
    localStorage.removeItem("searchPhotos");
    localStorage.removeItem("lastQuery");
  },

  fetchTrending: async () => {
    try {
      const res = await axios.get(
        `https://api.pexels.com/v1/curated?per_page=40`,
        {
          headers: { Authorization: apiKey },
        }
      );
      set({ photos: res.data.photos });
    } catch (err) {
      console.error("Error fetching trending photos:", err);
    }
  },

fetchExplore: async () => {
  try {
    const page1 = await axios.get(
      `https://api.pexels.com/v1/curated?page=1&per_page=20`,
      { headers: { Authorization: apiKey } }
    );

    const page2 = await axios.get(
      `https://api.pexels.com/v1/curated?page=2&per_page=20`,
      { headers: { Authorization: apiKey } }
    );

    const combined = [...page1.data.photos, ...page2.data.photos];
    set({ photos: combined, page: 2 });
  } catch (err) {
    console.error("Error fetching explore photos:", err);
  }
},

  toggleFavourite: (photo) => {
    const { user } = useUserStore.getState();
    if (!user) {
      alert("Please log in to save favourites.");
      return;
    }

    const state = get();
    const isFavourite = state.favourites.some((fav) => fav.id === photo.id);

    const updated = isFavourite
      ? state.favourites.filter((fav) => fav.id !== photo.id)
      : [...state.favourites, photo];

    localStorage.setItem("favourites", JSON.stringify(updated));
    set({ favourites: updated });
  },
}));

