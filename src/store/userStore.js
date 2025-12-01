import { create } from "zustand";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const FAVS_STORAGE_KEY = "photosphere_favourites";

export const useUserStore = create((set, get) => ({
  user: null,
  favourites: JSON.parse(localStorage.getItem(FAVS_STORAGE_KEY)) || [],
  isLoadingAuth: true,

 registerWithEmail: async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error registering with email:", error.message);
    throw error;
  }
 },

 loginWithEmail: async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await get().ensureFirestoreProfileExists(userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in with email:", error.message);
    throw error;
  }
 }, 

  loginWithGoogle: async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error("Error initiating Google redirect:", error.message);
      throw error;
    }
  },

    handleGoogleRedirectResult: async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result) {
        console.log("Google redirect sign-in successful:", result.user.uid);
        await get().ensureFirestoreProfileExists(result.user);
        return result.user;
      }
      return null;
    } catch (error) {
      console.error("Error handling Google redirect result:", error.message);
      throw error;
    }
  },

logout: async () => {
  try {
    await signOut(auth);
    localStorage.removeItem(FAVS_STORAGE_KEY);
    set({ user: null, favourites: [] });
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw error;
  }
},

ensureFirestoreProfileExists: async (firebaseUser) => {
    const userDocRef = doc(db, "users", firebaseUser.uid);
    try {
      const userDocSnap = await getDoc(userDocRef);

      let dataToUpdate = {};
      let hasDataChanged = false;

      const authDisplayName = firebaseUser.displayName;
      const authFirstName = authDisplayName ? authDisplayName.split(' ')[0] : null;
      const authLastName = authDisplayName && authDisplayName.split(' ').length > 1 ? authDisplayName.split(' ').slice(1).join(' ') : null;
      const authProfilePicture = firebaseUser.photoURL || null;
      const isGoogleUser = firebaseUser.providerData.some(p => p.providerId === 'google.com');

      if (!userDocSnap.exists()) {
        console.log("Creating new Firestore user profile for:", firebaseUser.uid);
        dataToUpdate = {
          firstName: authFirstName || (firebaseUser.email ? firebaseUser.email.split('@')[0] : null),
          lastName: authLastName,
          email: firebaseUser.email,
          profilePicture: authProfilePicture,
          createdAt: new Date(),
        };
        hasDataChanged = true;
      } else {
        const existingData = userDocSnap.data();

        if (firebaseUser.email && existingData.email !== firebaseUser.email) {
          dataToUpdate.email = firebaseUser.email;
          hasDataChanged = true;
        }

        if (authProfilePicture && existingData.profilePicture !== authProfilePicture) {
          dataToUpdate.profilePicture = authProfilePicture;
          hasDataChanged = true;
        }

        if (isGoogleUser && authFirstName && existingData.firstName !== authFirstName) {
            dataToUpdate.firstName = authFirstName;
            hasDataChanged = true;
        }
        if (isGoogleUser && authLastName && existingData.lastName !== authLastName) {
            dataToUpdate.lastName = authLastName;
            hasDataChanged = true;
        }

        if (!existingData.createdAt) { 
          dataToUpdate.createdAt = new Date();
          hasDataChanged = true;
        }
      }

      if (hasDataChanged) {
        await setDoc(userDocRef, dataToUpdate, { merge: true });
      }

    } catch (error) {
      console.error("Error ensuring Firestore profile exists:", error);
    }
  },

 initAuthListener: () => {
  onAuthStateChanged(auth, async (firebaseUser) => {
    try {
      const redirectResult = await get().handleGoogleRedirectResult();

      if (redirectResult) {
        set({ user: redirectResult });
        await get().ensureFirestoreProfileExists(redirectResult);
        return;
      }

      if (firebaseUser) {
        set({ user: firebaseUser });
        await get().ensureFirestoreProfileExists(firebaseUser);
      } else {
        set({ user: null, favourites: [] });
        localStorage.removeItem(FAVS_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Auth init error:", error);
      set({ user: null, favourites: [] });
      localStorage.removeItem(FAVS_STORAGE_KEY);
    } finally {
      set({ isLoadingAuth: false });
    }
  });
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
