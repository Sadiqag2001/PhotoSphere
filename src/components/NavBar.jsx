import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import { usePhotoStore } from "../store/photostore";
import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { IoMenu } from "react-icons/io5";

function NavBar() {
  const searchPhotos = usePhotoStore((state) => state.searchPhotos);
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    await searchPhotos(query);
    navigate("/search");
    setMenuOpen(false);
  };

  return (
    <div className="absolute z-30 top-0 left-0 w-full flex items-center justify-between p-4 bg-transparent">
      <h1
        onClick={() => navigate("/")}
        className="text-xl sm:text-2xl md:text-3xl text-white cursor-pointer whitespace-nowrap"
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
          className="w-full pl-4 pr-10 py-3 rounded-3xl border border-white focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm bg-transparent text-white placeholder:text-gray-300"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
        >
          <ImSearch />
        </button>
      </form>

      <div className="hidden md:flex gap-6 items-center text-white">
        <p onClick={() => navigate("/")} className="hover:text-gray-300">
          Home
        </p>
        <p onClick={() => navigate("/explore")} className="hover:text-gray-300">
          Explore
        </p>
        <p
          onClick={() => navigate("/favourites")}
          className="hover:text-gray-300"
        >
          Favourites
        </p>
        <p onClick={() => navigate("/contact")} className="hover:text-gray-300">
          Contact Us
        </p>
        <div onClick={() => navigate("/login")} className="cursor-pointer">
          <RxAvatar size={26} />
        </div>
      </div>

      <div
        className="md:hidden text-white cursor-pointer ml-3"
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
            <div onClick={() => { navigate("/login"); setMenuOpen(false); }} className="flex flex-row items-center gap-3">
              <RxAvatar size={26} /> Login
            </div>
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
