import React, { useState, useEffect } from "react";
import { ImSearch } from "react-icons/im";
import { usePhotoStore } from "../store/photostore";
import { useNavigate, useLocation  } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { IoMenu } from "react-icons/io5";
import { useUserStore } from "../store/userStore";
import { db } from "../store/firebase";
import { doc, getDoc } from "firebase/firestore";

function NavBar() {
  const searchPhotos = usePhotoStore((state) => state.searchPhotos);
  const { user, logout } = useUserStore();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
       
        const userDocRef = doc(db, "users", user.uid);
        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserProfile(userDocSnap.data());
          } else {
            console.log("No such user profile document in Firestore!");
            setUserProfile(null); 
          }
        } catch (error) {
          console.error("Error fetching user profile from Firestore:", error);
          setUserProfile(null);
        }
      } else {
        
        setUserProfile(null);
      }
    };

    fetchUserProfile();
  }, [user]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    await searchPhotos(query);
    navigate("/search");
    setMenuOpen(false);
  };

  return (
    <div   className={`
    absolute z-50 top-0 left-0 w-full flex items-center justify-between p-4 bg-transparent
    ${isHome ? "text-white" : "text-black"}
  `}>
      <h1
        onClick={() => navigate("/")}
          className={`text-xl sm:text-2xl md:text-3xl cursor-pointer whitespace-nowrap
          ${isHome ? "text-white" : "text-black"}`}
      >
        PhotoSphere
      </h1>

            <form
              onSubmit={handleSubmit}
              className="flex-1 mx-4 flex items-center relative max-w-md"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className={`w-full pl-4 pr-10 py-3 rounded-3xl border focus:outline-none text-sm bg-transparent
                    ${isHome 
                    ? "border-white text-white placeholder:text-gray-300 focus:ring-gray-200" 
                    : "border-black text-black placeholder:text-gray-500 focus:ring-gray-300"
                  }`}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        >
          <ImSearch />
        </button>
      </form>

      <div className={`hidden lg:flex gap-6 cursor-pointer items-center ${isHome ? "text-white" : "text-black"}`}>
        <p onClick={() => navigate("/")} className="hover:opacity-70">Home</p>
        <p onClick={() => navigate("/explore")} className="hover:opacity-70">Explore</p>
        <p onClick={() => navigate("/favourites")} className="hover:opacity-70">Favourites</p>
        <p onClick={() => navigate("/contact")} className="hover:opacity-70">Contact Us</p>

        {user ? (
          <div className="flex items-center gap-3">
            {userProfile?.firstName && (
              <span className="whitespace-nowrap">Hey, {userProfile.firstName}</span>
            )}

            {userProfile?.profilePicture ? (
              <img
                src={userProfile.profilePicture}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
                onClick={() => navigate("/profile")}
              />
            ) : (
              <RxAvatar
                size={28}
                className="cursor-pointer"
                onClick={() => navigate("/profile")}
              />
            )}
          </div>
        ) : (
          <RxAvatar
            size={28}
            className="cursor-pointer"
            onClick={() => navigate("/login")}
          />
        )}
      </div>

      <div
        className={`lg:hidden cursor-pointer ml-3 
        ${isHome ? "text-white" : "text-black"}`}
        onClick={() => setMenuOpen(true)}
      >
        <IoMenu size={28} />
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-2/3 bg-[#01172b] p-6 flex flex-col gap-6 text-white">
            <p onClick={() => { navigate("/"); setMenuOpen(false); }}>Home</p>
            <p onClick={() => { navigate("/explore"); setMenuOpen(false); }}>Explore</p>
            <p onClick={() => { navigate("/favourites"); setMenuOpen(false); }}>Favourites</p>
            <p onClick={() => { navigate("/contact"); setMenuOpen(false); }}>Contact Us</p>
            {user ? (
              <>
                <p className="text-sm whitespace-nowrap">Hey, {userProfile?.firstName}</p>

                {userProfile?.profilePicture ? (
                  <img
                    src={userProfile.profilePicture}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover cursor-pointer"
                    onClick={() => { navigate("/profile"); setMenuOpen(false); }}
                  />
                ) : (
                  <RxAvatar
                    size={26}
                    className="cursor-pointer"
                    onClick={() => { navigate("/profile"); setMenuOpen(false); }}
                  />
                )}
              </>
            ) : (
              <RxAvatar
                size={26}
                className="cursor-pointer"
                onClick={() => { navigate("/login"); setMenuOpen(false); }}
              />
            )}

          </div>
          <div
            className="w-1/3 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          ></div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
