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
  };

  return (
    <div className="absolute z-30 top-0 left-0 w-full flex items-center justify-between p-4">
      <h1
        onClick={() => navigate("/")}
        className="text-2xl sm:text-3xl md:text-4xl text-white cursor-pointer"
      >
        PhotoSphere
      </h1>

      <div className="relative flex-1 mx-4 hidden md:block">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What are you looking for?"
            className="w-full md:pl-4 md:pr-12 py-2 rounded-3xl border border-white focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm md:text-base"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
          >
            <ImSearch />
          </button>
        </form>
      </div>

      <div className="hidden md:flex gap-6 items-center text-white mr-6">
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
        <div onClick={() => navigate("/login")}>
          <RxAvatar size={26} />
        </div>
      </div>

      <div
        className="md:hidden text-white cursor-pointer"
        onClick={() => setMenuOpen(true)}
      >
        <IoMenu size={30} />
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-1/2 bg-[#01172b] p-6 flex flex-col gap-6 text-white">
            <p onClick={() => { navigate("/"); setMenuOpen(false); }}>Home</p>
            <p onClick={() => { navigate("/explore"); setMenuOpen(false); }}>Explore</p>
            <p onClick={() => { navigate("/favourites"); setMenuOpen(false); }}>Favourites</p>
            <p onClick={() => { navigate("/contact"); setMenuOpen(false); }}>Contact Us</p>
            <div onClick={() => { navigate("/login"); setMenuOpen(false); }} className="flex flex-row items-center gap-3">
              <RxAvatar size={26} /> Login
            </div>
          </div>
          <div
            className="w-1/2 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          ></div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
