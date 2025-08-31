import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "../store/userStore";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (photos.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [photos]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agree) {
      alert("You must agree to the terms and conditions");
      return;
    }

    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.username.trim() ||
      !form.password.trim()
    ) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log("Registered user:", data);

      setUser(data);
      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full h-auto bg-[#010f1b] pt-20 flex items-center justify-center">
      <div className="w-[90%] h-[90%] flex flex-col md:flex-row rounded-xl p-4 bg-[#01172b]">
        
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

          <div className="w-[calc(100%-16px)] h-full p-4 flex flex-col justify-between absolute">
            <div className="flex justify-between items-center gap-4">
              <h1 className="text-xl font-bold text-white">PhotoSphere</h1>
              <div
                onClick={() => navigate("/")}
                className="bg-amber-50/30 text-white cursor-pointer text-[10px] rounded-2xl flex items-center justify-center gap-2 py-1.5 px-2"
              >
                Back to Home page <FaArrowRight />
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center text-white">
              <h3 className="text-lg">Capturing Moments,</h3>
              <h3 className="text-lg">Creating Memories</h3>
              <div className="flex gap-3 mt-6 pb-2">
                <div className="w-4.5 h-[2.5px] bg-white/45 rounded-[6px]" />
                <div className="w-4.5 h-[2.5px] bg-white/45 rounded-[6px]" />
                <div className="w-5.5 h-[2.5px] bg-white rounded-[6px]" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[50%] py-10 px-6 md:px-10 flex flex-col justify-center text-white">
          <h3 className="text-2xl font-bold pt-5">Create an Account</h3>
          <p className="mb-6 text-[12px]">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="underline text-[#b09cec] cursor-pointer"
            >
              Log in
            </span>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
            <div className="flex flex-col md:flex-row gap-3">
              <input
                className="w-full md:w-1/2 h-[48px] px-3 text-white text-sm placeholder:text-white/40 bg-white/5 rounded-sm"
                placeholder="First name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
              <input
                className="w-full md:w-1/2 h-[48px] px-3 text-white text-sm placeholder:text-white/40 bg-white/5 rounded-sm"
                placeholder="Last name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
            <input
              className="w-full h-[48px] px-3 text-white text-sm placeholder:text-white/40 bg-white/5 rounded-sm"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="w-full h-[48px] px-3 text-white text-sm placeholder:text-white/40 bg-white/5 rounded-sm"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <div className="w-full h-[48px] relative">
              <input
                className="w-full h-full px-3 text-white text-sm placeholder:text-white/40 bg-white/5 rounded-sm"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <IoEyeOff className="absolute right-3 top-[17px]" />
                ) : (
                  <IoEye className="absolute right-3 top-[17px]" />
                )}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => setForm({ ...form, agree: e.target.checked })}
              />
              <p className="text-sm">
                I agree to the{" "}
                <span className="underline text-[#b09cec] cursor-pointer">
                  Terms and Conditions
                </span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#6d54b5] text-white mb-3 py-4 flex items-center justify-center rounded-[4px] cursor-pointer"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
