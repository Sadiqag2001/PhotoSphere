import { useEffect, useState } from "react";
// import LoginImage from "../assets/login.jpeg";
import { FaArrowRight } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { usePhotoStore } from "../store/photostore";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn, isLoggedIn } = usePhotoStore();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [pageInitialized, setPageInitialized] = useState(false);

  useEffect(() => {
    if (isLoggedIn && !pageInitialized) {
      navigate("/dashboard");
    } else {
      setPageInitialized(true);
    }
  }, [isLoggedIn]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.username.trim().length <= 0 || form.password.trim().length <= 0) {
      alert("You must fill in the fields");
      return;
    }

    fetch("https://dummyjson.com/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
        expiresInMins: 180, // optional, defaults to 60
      }),
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.ok) {
          console.log("data>>>", data);
          setUser(data);
          setIsLoggedIn(true);

          alert("Logged in successfully");
          navigate("/dashboard");
        } else {
          alert(data?.message || "Error logging in, please try again");
        }
      })
      .then(console.log);
  };

  return (
    <div className="w-full h-full bg-[#686279] flex items-center justify-center">
      <div className="w-[80%] h-[80%] flex rounded-xl p-4 bg-[#2c2638]">
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
              <h1 className="text-xl font-bold">PhotoSphere</h1>
              <div className="bg-amber-50/30 text-white cursor-pointer text-[10px] rounded-2xl flex items-center justify-center gap-2 py-0.5 px-1.5">
                Back to website <FaArrowRight />
              </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <h3>Capturing Moments,</h3>
              <h3>Creating Memories</h3>

              <div className="flex gap-3 mt-6 pb-2">
                <div className="w-4.5 h-[2.5px] bg-white/45 rounded-[6px]" />
                <div className="w-4.5 h-[2.5px] bg-white/45 rounded-[6px]" />
                <div className="w-5.5 h-[2.5px] bg-white rounded-[6px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%] py-10 px-10 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4">Welcome back</h3>
          <p className="mb-6 text-[10px]">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => {
                navigate("/register");
              }}
              className="underline text-[#b09cec]"
            >
              Register
            </span>
          </p>
          <div className="flex flex-col gap-3 mb-6">
            <input
              className="w-full h-[48px] px-3 text-white text-sm placeholder:text-white/40 bg-white/5 rounded-sm"
              placeholder="Username"
              value={form.username}
              onChange={(e) => {
                setForm({
                  ...form,
                  username: e.target.value,
                });
              }}
            />
            <div className="w-full h-[48px] relative">
              <input
                className="w-full h-full px-3 text-white text-sm placeholder:text-white/40 bg-white/5 rounded-sm"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => {
                  setForm({
                    ...form,
                    password: e.target.value,
                  });
                }}
              />
              <span
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <IoEyeOff className="absolute right-3 top-[17px]" />
                ) : (
                  <IoEye className="absolute right-3 top-[17px]" />
                )}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div
              onClick={handleSubmit}
              className="w-full bg-[#6d54b5] text-white mb-6 py-4 flex items-center justify-center rounded-[4px]"
            >
              Login
            </div>

            <div className="flex items-center gap-3 mb-4">
              <hr className="w-full opacity-50" />
              <span className="text-[10px] opacity-50">or register with</span>
              <hr className="w-full opacity-50" />
            </div>
            <div className="flex gap-3 cursor-pointer">
              <div className="hover:cursor-pointer text-white py-2 w-[50%] rounded-sm border border-white flex gap-2 items-center justify-center">
                <FcGoogle />
                Google
              </div>
              <div className="hover:cursor-pointer text-white py-2 w-[50%] rounded-sm border border-white flex gap-2 items-center justify-center">
                <FaApple fill="white" /> Apple
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
