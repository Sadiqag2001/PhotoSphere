import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { useUserStore } from "../store/userStore"; 

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUserStore();

  const [form, setForm] = useState({ username: "", password: "" });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      alert("You must fill in the fields");
      return;
    }

    const fakeUser = { name: form.username, email: `${form.username}@photosphere.com` };
    login(fakeUser);
    alert("Logged in successfully");
    navigate("/favourites");
  };

  const handleGuestLogin = () => {
    const fakeUser = { name: "Guest User", email: "guest@photosphere.com" };
    login(fakeUser);
    navigate("/favourites");
  };

  return (
    <div className="w-full h-screen bg-[#010f1b] pt-20 flex items-center justify-center">
      <div className="w-[80%] h-[90%] flex rounded-xl p-4 bg-[#2c2638]">
        <div className="w-[50%] relative overflow-hidden rounded-xl">
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

        <div className="w-[50%] py-10 px-10 flex flex-col justify-center text-white">
          <h3 className="text-2xl font-bold pt-5">Welcome back</h3>
          <p className="mb-6 text-[10px]">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="underline text-[#b09cec] cursor-pointer"
            >
              Register
            </span>
          </p>
          <div className="flex flex-col gap-3 mb-6">
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
          </div>

          <div
            onClick={handleSubmit}
            className="w-full bg-[#6d54b5] text-white mb-3 py-4 flex items-center justify-center rounded-[4px] cursor-pointer"
          >
            Login
          </div>

          <div
            onClick={handleGuestLogin}
            className="w-full bg-gray-500 text-white mb-6 py-4 flex items-center justify-center rounded-[4px] cursor-pointer hover:bg-gray-600"
          >
            Continue as Guest
          </div>
          <div className="flex items-center gap-3 mb-4">
            <hr className="w-[50%] opacity-50" />
            <span className="text-[10px] text-center opacity-50">login to access your favourites</span>
            <hr className="w-[50%] opacity-50" />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
