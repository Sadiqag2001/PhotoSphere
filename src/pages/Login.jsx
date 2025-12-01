import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom"; 
import axios from "axios";
import { useUserStore } from "../store/userStore"; 
// import { GrGoogle } from "react-icons/gr";
// import { CgGoogle } from "react-icons/cg";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { loginWithEmail, loginWithGoogle } = useUserStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const redirectPath = location.state?.from?.pathname || '/';

 


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
    if (!form.email || !form.password) {
      alert("You must fill in the fields");
      return;
    }

     try {
      sessionStorage.setItem('redirectAfterLogin', redirectPath); 
      await loginWithEmail(form.email, form.password);

    } catch (error) {
      console.error("Firebase Login Error (Email/Password):", error);
      sessionStorage.removeItem('redirectAfterLogin'); 
      let errorMessage = "Something went wrong. Please try again.";
      if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password.";
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "This user account has been disabled.";
      }
      alert(errorMessage);
    }
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     sessionStorage.setItem('redirectAfterLogin', redirectPath);
  //     await loginWithGoogle();
  //   } catch (error) {
  //     console.error("Firebase Login Error (Google):", error);
  //     sessionStorage.removeItem('redirectAfterLogin'); 
  //     let errorMessage = "Something went wrong with Google sign-in. Please try again.";
  //     if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") {
  //       errorMessage = "Google sign-in was cancelled or interrupted. Please try again.";
  //     }
  //     alert(errorMessage);
  //   }
  // };

  return (
    <div className="w-full h-auto bg-(--color-beige)  pt-30 pb-20 flex items-center justify-center">
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

        <div className="w-full md:w-[50%] py-10 px-6 md:px-10 flex flex-col justify-center text-gray-800 bg-[#01172b] rounded">
          <h3 className="text-2xl text-[#dedede] font-bold md:pt-1">Welcome back</h3>
          <p className="mb-6 text-[15px] text-[#dedede]">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="underline text-blue cursor-pointer"
            >
              Register
            </span>
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              className="w-full h-[48px] px-3 text-white text-sm placeholder:text-white/40 bg-white/5 rounded-sm"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                  <IoEyeOff className="absolute text-white right-3 top-[17px]" />
                ) : (
                  <IoEye className="absolute text-white right-3 top-[17px]" />
                )}
              </span>
            </div>

          <button
            type="submit"
            className="w-full bg-(--color-beige) text-white mb-3 py-4 flex items-center justify-center rounded-[4px] cursor-pointer"
            >
            Login
          </button>
            </form>
          {/* <div
            onClick={handleGoogleLogin}
            className="w-full bg-blue-600 text-white mb-6 py-4 gap-2 flex items-center justify-center rounded-[4px] cursor-pointer hover:bg-blue-700"
          >
            Login with Google <CgGoogle />
          </div> */}

          <div className="flex text-[#dedede] items-center gap-3 pb-15">
            <hr className="w-[50%] opacity-50" />
            <span className="text-[10px] text-center opacity-50">
              login to access your favourites
            </span>
            <hr className="w-[50%] opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
