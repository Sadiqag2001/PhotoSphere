import React,{useState, useEffect} from "react";
// import loginImage from "../assets/login-picture.jpg";
import { FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { usePhotoStore } from "../store/photostore";
import { useNavigate } from "react-router-dom";


function Register() {
    const fetchTrending = usePhotoStore((state) => state.fetchTrending);
    const photos = usePhotoStore((state) => state.photos);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    }
      const { setUser } = usePhotoStore();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.agree) {
      alert("You have to read and agree to the terms and conditions");
      return;
    }

    if (
      form.lastName.trim().length <= 0 ||
      form.firstName.trim().length <= 0 ||
      form.email.trim().length <= 0 ||
      form.username.trim().length <= 0 ||
      form.password.trim().length <= 0
    ) {
      alert("You must fill in the fields");
      return;
    }

    fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log("data>>>", data);
        setUser(data);

        alert("Account created successfully");
        navigate("/login");
      })
      .then(console.log);

     useEffect(() => {
        fetchTrending();
      }, [fetchTrending]);
    
    
      useEffect(() => {
        if (photos.length === 0) return;
    
        const interval = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % photos.length);
        }, 5000);
    
        return () => clearInterval(interval);
      }, [photos]);
    

    }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex bg-[#362c48] shadow-2xl w-[90%] h-[90%] rounded-2xl">
        <div className="flex w-[50%] relative rounded-2xl overflow-hidden">
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

        {/* //   <img
        //     src={loginImage}
        //     alt="login image"
        //     className="bg-cover absolute rounded-2xl w-[100%]  h-[100%] p-3"
        //   /> */}

          <div className="w-[100%] z-50 flex flex-col gap-85 ">
            <div className="flex justify-between m-4">
              <h1 className=" text-white text-xl ml-3 mt-2">
                PhotoSphere
              </h1>
              <button className="font-[poppins] font-extralight p-0.5 px-4 rounded-2xl mr-3 mt-2 bg-amber-50/20 text-base justify-center items-center flex gap-2 text-white">
                Back to website <FaArrowRight />
                onClick={handleClick}
              </button>
            </div>
            <div className=" w-[100%] flex justify-center items-center flex-col text-white">
              <p className="font-[poppins] text-xl">Capturing moments,</p>
              <p className="font-[poppins] text-xl">Creating memories</p>
              <div className="flex flex-row gap-1.5 mt-2">
                <div className="w-6 border-b-4 text-gray-600"></div>
                <div className="w-6 border-b-4 text-gray-600"></div>
                <div className="w-6 border-b-4 text-white"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%] p-6">
          <div className="flex flex-col justify-center w-full">
              <h2 className="font-[poppins] text-white text-3xl mb-3">
                Create an account
              </h2>
              <p className="font-[poppins] text-sm text-white">
                Already have an account?{" "}
                <span className="hover:cursor-pointer underline decoration-solid text-[#504598]">
                  Log-in
                </span>
              </p>
          </div>
          <div className="flex flex-col gap-4 w-[100%] mt-8">
            <div className="flex gap-3 w-[100%]">
              <input
                type="text"
                placeholder="First name"
                className="w-[50%] placeholder:text-[14px] placeholder:font-[poppins] border-0 bg-white/10 text-base text-gray-500 p-2 rounded"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-[50%] placeholder:text-[14px] placeholder:font-[poppins] border-0 bg-white/10 text-base text-gray-500 p-2 rounded"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full placeholder:text-[14px] placeholder:font-[poppins] border-0 bg-white/10 text-base text-gray-500 p-2 rounded"
            />
            <input
              type="text"
              placeholder="Enter your password"
              className="w-full placeholder:text-[14px] placeholder:font-[poppins] border-0 bg-white/10 text-base text-gray-500 p-2 rounded"
            />
            <div className="flex flex-row gap-2">
              <input type="checkbox" name="" id="" />
              <p className="font-[poppins] text-sm text-white">I agree to the <span className="hover:cursor-pointer underline decoration-solid text-[#504598]">Terms and Conditions</span></p>
            </div>
            <button className="bg-[#504598] p-3 mt-4 w-full rounded text-white text-sm font-[poppins]">Create account</button>
            <div>
              <div className="flex justify-between items-center text-white/50"><hr className="max-w-50 text-white/45 border-[1px] w-full"/>or register with<hr className="max-w-50 text-white/50 border-[1px] w-full" /></div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-[100%] mt-5">
            <div className="flex gap-3 justify-between overflow-hidden w-[100%]">
              <button className="border-[1px] px-20 py-2 flex justify-evenly items-center gap-2 text-white/70 font-[poppins] rounded"><FcGoogle /> Google</button>
              <button className="border-[1px] px-20  py-2 flex justify-evenly items-center gap-2 text-white/70 font-[poppins] rounded"><FaApple /> Apple</button>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
