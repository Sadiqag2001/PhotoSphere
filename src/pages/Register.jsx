import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "../store/userStore";
import { db } from "../store/firebase";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const { registerWithEmail } = useUserStore();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto image slideshow
  useEffect(() => {
    if (photos.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [photos]);

  // Fetch Pexels images
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await axios.get("https://api.pexels.com/v1/curated?per_page=10", {
          headers: { Authorization: import.meta.env.VITE_PEXELS_API_KEY },
        });
        setPhotos(res.data.photos);
      } catch (err) {
        console.error("Error fetching Pexels photos:", err);
      }
    };
    fetchPopular();
  }, []);

  // Inline Validation
  const validateForm = () => {
    let newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.password.trim()) newErrors.password = "Password is required";
    if (!form.agree) newErrors.agree = "You must agree to continue";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const firebaseUser = await registerWithEmail(form.email, form.password);

      await setDoc(doc(db, "users", firebaseUser.uid), {
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        profilePicture: null,
        createdAt: new Date(),
      });

      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Firebase Registration Error:", error);

      let errorMessage = "Something went wrong. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters.";
      }

      setErrors({ form: errorMessage });
    }
  };

  return (
    <div className="w-full h-auto bg-[#010f1b] pt-20 flex items-center justify-center">
      <div className="w-[90%] h-[90%] flex flex-col md:flex-row rounded-xl p-4 bg-[#01172b]">

        {/* Left Image Section */}
        <div className="hidden md:block w-[50%] relative overflow-hidden rounded-xl">
          {photos.map((photo, index) => (
            <img
              key={photo.id}
              src={photo.src.landscape}
              alt={photo.alt}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          <div className="absolute inset-0 p-4 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-white">PhotoSphere</h1>
              <div
                onClick={() => navigate("/")}
                className="bg-amber-50/30 text-white cursor-pointer text-[10px] rounded-xl flex items-center gap-2 py-1.5 px-2"
              >
                Back to Home <FaArrowRight />
              </div>
            </div>

            <div className="flex flex-col items-center text-white pb-5">
              <h3 className="text-lg">Capturing Moments</h3>
              <h3 className="text-lg">Creating Memories</h3>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-[50%] py-10 px-6 md:px-10 text-white">
          <h3 className="text-2xl font-bold pt-5">Create an Account</h3>
          <p className="mb-6 text-[12px]">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="underline text-[#b09cec] cursor-pointer">
              Log in
            </span>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">

            {/* Name Fields */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="w-full">
                <input
                  className="w-full h-[48px] px-3 outline-none bg-white/5 rounded-sm text-sm placeholder:text-white/40"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                />
                {errors.firstName && <p className="text-red-400 text-xs">{errors.firstName}</p>}
              </div>

              <div className="w-full">
                <input
                  className="w-full h-[48px] px-3 outline-none bg-white/5 rounded-sm text-sm placeholder:text-white/40"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />
                {errors.lastName && <p className="text-red-400 text-xs">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                className="w-full h-[48px] px-3 outline-none bg-white/5 rounded-sm text-sm placeholder:text-white/40"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
            </div>

            {/* Username */}
            <div>
              <input
                className="w-full h-[48px] px-3 outline-none bg-white/5 rounded-sm text-sm placeholder:text-white/40"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
              {errors.username && <p className="text-red-400 text-xs">{errors.username}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                className="w-full h-[48px] px-3 outline-none bg-white/5 rounded-sm text-sm placeholder:text-white/40"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}

              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <IoEyeOff className="absolute right-3 top-[17px]" />
                ) : (
                  <IoEye className="absolute right-3 top-[17px]" />
                )}
              </span>
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => setForm({ ...form, agree: e.target.checked })}
              />
              <p className="text-sm">I agree to the Terms and Conditions</p>
            </div>
            {errors.agree && <p className="text-red-400 text-xs">{errors.agree}</p>}

            {/* Submit */}
            <button className="w-full bg-[#6d54b5] py-4 rounded-md">
              Create Account
            </button>

            {/* Form-level Errors */}
            {errors.form && (
              <p className="text-red-400 text-sm text-center mt-2">{errors.form}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
