import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { db, storage } from "../store/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";

function EditProfile() {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setUsername(data.username || "");
        setBio(data.bio || "");
        setProfilePicture(data.profilePicture || "");
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setProfilePicture(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageURL = profilePicture;

      if (profilePicture instanceof File) {
         console.log("Attempting upload for UID:", user.uid);
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, profilePicture);
        imageURL = await getDownloadURL(storageRef);
      }

      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        firstName,
        lastName,
        username,
        bio,
        profilePicture: imageURL,
      });

      toast.success("Profile updated successfully!");
      navigate("/profile");

    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating your profile.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen text-white px-6 pb-10 pt-20 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2 text-[#01172b]">Edit Profile</h1>

      <form
        onSubmit={handleUpdateProfile}
        className="w-full max-w-md  bg-[#010f1b] p-6 rounded-xl shadow-xl flex flex-col gap-6"
      >
        {/* Profile Picture */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 p-2 border-gray-300">
            <img
              src={previewImage || profilePicture || "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <label className="cursor-pointer bg-[#01172b] hover:bg-blue-700/40 px-4 py-2 rounded-lg text-sm">
            Change Photo
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <div>
          <label className="text-sm">First Name</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-[#002238]/20 border-b border-gray-600 outline-none mt-1"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm">Last Name</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-[#002238]/20 border-b border-gray-600 outline-none mt-1"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm">Username</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-[#002238]/20 border-b border-gray-600 outline-none mt-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm">Bio</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg bg-[#002238]/20 border-b border-gray-600 outline-none mt-1"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-2">
        <button 
        type="button"
        className=" w-full border-2 border-white text-white hover:border-white/50 hover:text-white/50 px-4 py-3 rounded-lg mt-2 font-semibold"
        onClick={() => navigate("/profile")}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#01172b] hover:bg-blue-700/40 px-4 py-3 rounded-lg mt-2 font-semibold"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
