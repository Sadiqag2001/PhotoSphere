// import { create } from "zustand";
// import axios from "axios";

// const apiKey = import.meta.env.VITE_API_KEY;

// export const usePhotoStore = create((Set) => ({
//     photos: [],
//     favourites: JSON.parse(localStorage.getItem('favourites')) || [],
//     searchPhotos: async (query) => {
//         try {
//         const res = await axios.get(
//             `https://api.pexels.com/v1/search?query=${query}&per_page=12`,
//             {
//             headers: {
//                 Authorization: apiKey,
//             },
//             }
//         );
//       set({ photos: res.data.photos });
//     } catch (err) {
//       console.error("Error fetching photos:", err);
//     }
//   },
//     fetchTrending: async () => {
        
//         try {
//                 const res = await axios.get(
//                     `https://api.pexels.com/v1/curated?per_page=12`,
//                 {
//                     headers: {
//                         Authorization: apiKey,
//                     },
//                 }
//             );
//             set({ photos: res.data });
//             } catch (err) {
//                 console.error("Error fetching photos:", err);
//             }
//     },
//     toggleFavourite: (photos) => {
//         const isFavourite = state.favourites.some((favourite) => favourite.id === photos.id);
//         const updated = isFavourite ? state.favourites.filter((favourite) => favourite.id != photos.id)
//         : [...state.favourites , photo];

//         localStorage.setItem('favourites', JSON.stringify(updated));
//         return { favourite: updated };
//     }
// }))



// store/photoStore.js
import { create } from "zustand";
import axios from "axios";

const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

export const usePhotoStore = create((set, get) => ({
  photos: [],
  favourites: JSON.parse(localStorage.getItem("favourites")) || [],

  // 🔍 Search Photos
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

  // 🔥 Trending Photos
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

  // ⭐ Toggle Favourites
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
