import { create } from "zustand";
import axios from "axios";

const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_KEY;

export const usePhotoStore = create((Set) => ({
    photos: [],
    favourites: JSON.parse(localStorage.getItem('favourites')) || [],
    searchPhotos: async (query) => {
        const res = await axios.get(
            `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}`
        );
        set({ photos: res.data });
    },
    fetchTrending: async () => {
        const res = await axios.get(
            `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`
        );
        set({ photos: res.data });
    },
    toggleFavourite: (photos) => {
        const isFavourite = state.favourites.some((favourite) => favourite.id === photos.id);
        const updated = isFavourite ? state.favourites.filter((favourite) => favourite.id != photos.id)
        : [...state.favourites , photo];

        localStorage.setItem('favourites', JSON.stringify(updated));
        return { favourite: updated };
    }
}))