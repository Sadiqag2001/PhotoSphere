import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { usePhotoStore } from "../store/photostore";
import { useUserStore } from "../store/userStore";

function Favourites() {
  const { favourites, removeFavourite } = useUserStore();
  
  if (favourites.length === 0) {
    return <p className="text-center text-gray-500 pt-30 mt-10">No favourites yet.</p>;
  }
  
    const [selectedPhoto, setSelectedPhoto] = useState(null);

 const handleDownload = async (url, filename) => {
    try {
      const res = await fetch(url, { mode: "cors" });
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename || "photo.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <div className="p-6 mt-16">
      <h2 className="text-5xl font-bold mb-6">Your Favourites</h2>
      <div className="columns-2 md:columns-3 gap-4">
        {favourites.map((photo) => (
          <div key={photo.id} className="mb-4 break-inside-avoid">
            <img src={photo.src.medium} alt={photo.photographer} onClick={() => setSelectedPhoto(photo)} className="rounded-lg" />
            <button
              onClick={() => removeFavourite(photo.id)}
              className="text-red-600 mt-2"
              >
              Remove
            </button>
          </div>
        ))}
      </div>
     
    {selectedPhoto && (
      <div
        className="fixed inset-0 flex justify-center items-center bg-black/90 z-50"
        onClick={() => setSelectedPhoto(null)}
      >
        <button
          onClick={() => setSelectedPhoto(null)}
          className="absolute top-5 right-5 text-white bg-black/50 rounded-full text-4xl p-2"
        >
          <ImCancelCircle />
        </button>

        <img
          src={selectedPhoto.src.large2x || selectedPhoto.src.large}
          alt={selectedPhoto.photographer}
          className="w-screen h-screen object-contain"
        />

        <div className="absolute bottom-6 flex gap-4">
          <a
            href={selectedPhoto.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-row gap-3 justify-center items-center underline rounded-2xl px-4 py-3 text-gray-800">
            View on Pexels <FaArrowRight />
          </a>
          <button
            onClick={() =>  handleDownload( selectedPhoto.src.original, `photo-${selectedPhoto.id}.jpg`)}
              className="rounded-2xl px-4 py-3 bg-gray-500/50 text-gray-800 shadow hover:bg-gray-700/50 flex items-center gap-2">
              <FiDownload /> Download
          </button>
        </div>
      </div>
    )}
    </div>
  );
}

export default Favourites;