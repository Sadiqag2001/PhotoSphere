import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../store/firebase";
import { useUserStore } from "../store/userStore";
import { FaCamera } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { getAuth, signOut } from "firebase/auth";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const [data, setData] = useState(null);
  const [profileURL, setProfileURL] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (!user?.uid) return;

    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const userData = snap.data();
          setData(userData);

          if (userData.profilePicture) {
            const url = await getDownloadURL(ref(storage, userData.profilePicture));
            setProfileURL(url);
          }

          if (userData.favorites) {
            setFavorites(userData.favorites);
          }
        }
      } catch (error) {
        console.error("Profile load error:", error);
      }
    };

    fetchData();
  }, [user]);

  if (!data) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-black">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-(--color-beige) pt-20 flex items-center justify-center">
      <div className="w-[90%] max-w-5xl p-6 bg-[#01172b] rounded-xl text-white">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">My Profile</h1>
          <div
            onClick={() => navigate("/")}
            className="bg-white/10 px-4 py-2 rounded-xl text-sm cursor-pointer flex items-center gap-2"
          >
            Back Home <FaArrowRight />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6">

          <div className="relative">
            <img
              src={
                profileURL ||
                "https://cdn-icons-png.flaticon.com/512/2102/2102647.png"
              }
              alt="profile"
              className="w-36 h-36 object-cover rounded-full border-[3px] border-white/20"
            />

            <div
              onClick={() => navigate("/edit-profile")}
              className="absolute bottom-0 right-0 bg-[#6d54b5] p-2 rounded-full cursor-pointer"
            >
              <FaCamera className="text-white" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold">
              {data.firstName} {data.lastName}
            </h2>
            <p className="text-white/70 text-sm">@{data.username}</p>
            <p className="text-white/50 text-sm mt-1">{data.email}</p>

            {data.bio && (
              <p className="mt-3 text-sm text-white/80 w-[90%]"> Bio: {data.bio || "add a bio"}</p>
            )}

            <div className="mt-4 flex items-center gap-3">
            <button
              className="bg-[#6d54b5] px-5 py-2 rounded-md"
              onClick={() => navigate("/edit-profile")}
            >
              Edit Profile
            </button>

            {user?.uid ? (
              <button
                className="bg-red-500 px-5 py-2 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="bg-green-500 px-5 py-2 rounded-md"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </div>

          </div>
        </div>

        {/* Favorite Images */}
        <div className="mt-10">
          <h3 className="text-lg font-bold mb-4">Favorite Images</h3>

          {favorites.length === 0 ? (
            <p className="text-white/60 text-sm">No favorites yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {favorites.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="favorite"
                  className="w-full h-32 object-cover rounded-md"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
