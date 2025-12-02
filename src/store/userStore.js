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
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

export const useUserStore = create((set, get) => ({
  user: null,
  favourites: [],
  favouritesLoading: true,
  unsubscribeFromFavorites: null,
  isLoadingAuth: true,

  // --- Authentication Actions ---
  registerWithEmail: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await get().ensureFirestoreProfileExists(userCredential.user);
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
      get().setUser(null);
    } catch (error) {
      console.error("Error signing out:", error.message);
      throw error;
    }
  },

  // --- Profile Management ---
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
          createdAt: serverTimestamp(),
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
          dataToUpdate.createdAt = serverTimestamp();
          hasDataChanged = true;
        }
      }

      if (hasDataChanged) {
        await setDoc(userDocRef, dataToUpdate, { merge: true });
      }

    } catch (error) {
      console.error("Error ensuring Firestore profile exists:", error);
      throw error;
    }
  },

  // --- Favorites Management ---

  setUser: (user) => {
    set({ user });
    get().setupFavoritesListener(user);
  },

  setupFavoritesListener: (user) => {
    const currentUnsubscribe = get().unsubscribeFromFavorites;
    if (currentUnsubscribe) {
      currentUnsubscribe();
    }

    if (user) {
      const favoritesCollectionRef = collection(db, 'users', user.uid, 'favorites');
      const q = query(favoritesCollectionRef, orderBy('favoritedAt', 'desc'));

      set({ favouritesLoading: true });

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newFavourites = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        set({ favourites: newFavourites, favouritesLoading: false });
      }, (error) => {
        console.error("DEBUG: ERROR in favorites listener:", error);
        set({ favourites: [], favouritesLoading: false });
      });

      set({ unsubscribeFromFavorites: unsubscribe });
    } else {
      set({ favourites: [], favouritesLoading: false });
    }
  },

  addFavourite: async (photo) => {
    const user = get().user;
    if (!user) {
      console.warn("User not logged in. Cannot add favorite.");
      return;
    }

    try {
      const favoriteDocRef = doc(db, 'users', user.uid, 'favorites', photo.id.toString());
      await setDoc(favoriteDocRef, {
        ...photo,
        favoritedAt: serverTimestamp(),
      });
      console.log("Photo added to favorites in Firestore:", photo.id);
    } catch (error) {
      console.error("Error adding favorite to Firestore:", error);
    }
  },

  removeFavourite: async (photoId) => {
    const user = get().user;
    if (!user) {
      console.warn("User not logged in. Cannot remove favorite.");
      return;
    }

    try {
      const favoriteDocRef = doc(db, 'users', user.uid, 'favorites', photoId.toString());
      await deleteDoc(favoriteDocRef);
      console.log("Photo removed from favorites in Firestore:", photoId);
    } catch (error) {
      console.error("Error removing favorite from Firestore:", error);
    }
  },

  // --- Auth State Change Listener (should be called once at app startup) ---
  initAuthListener: () => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      try {

        const redirectResult = await get().handleGoogleRedirectResult();

        if (redirectResult) {
          get().setUser(redirectResult);
          return;
        }

        if (firebaseUser) {
          get().setUser(firebaseUser);
          await get().ensureFirestoreProfileExists(firebaseUser);
        } else {
          get().setUser(null);
        }
      } catch (error) {
        console.error("DEBUG: Auth init error:", error); 
        get().setUser(null);
      } finally {
        set({ isLoadingAuth: false });
      }
    });
  },

  cleanup: () => {
    const currentUnsubscribe = get().unsubscribeFromFavorites;
    if (currentUnsubscribe) {
      currentUnsubscribe();
      set({ unsubscribeFromFavorites: null });
    }
    set({ user: null, favourites: [], favouritesLoading: false });
  }
}));
