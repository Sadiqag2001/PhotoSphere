import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { useUserStore } from "../store/userStore";

function Favourites() {
  const { favourites, removeFavourite } = useUserStore();

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

  if (favourites.length === 0) {
    return (
      <p className="text-center text-gray-500 pt-30 mt-10">
        No favorites yet.
      </p>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-10 mt-10">
      <h2 className="max-sm:text-2xl text-5xl text-gray-800 font-bold mb-6">
        Favorites
      </h2>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {favourites.map((photo) => (
          <div
            key={photo.id}
            className="break-inside-avoid rounded-lg overflow-hidden shadow-md hover:brightness-75 duration-300 ease-in-out"
          >
            <img
              src={photo.src.medium}
              srcSet={`${photo.src.medium} 640w, ${photo.src.large} 940w, ${photo.src.large2x} 1880w`}
              sizes="(max-width: 768px) 100vw, 33vw"
              alt={photo.photographer}
              className="w-full h-auto rounded-lg cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            />

            <div className="flex justify-between items-center px-2 py-2">
              <p className="font-normal text-sm">By {photo.photographer}</p>

              <button
                onClick={() => removeFavourite(photo.id)}
                className="text-3xl sm:text-4xl text-red-600"
              >
                <FaHeart />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Preview */}
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

          <div className="absolute bottom-6 flex flex-col sm:flex-row gap-4 items-center">
            <a
              href={selectedPhoto.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row gap-2 justify-center items-center underline rounded-2xl px-4 py-3 text-gray-200 bg-gray-800/60"
            >
              View on Pexels <FaArrowRight />
            </a>

            <button
              onClick={() =>
                handleDownload(
                  selectedPhoto.src.original,
                  `photo-${selectedPhoto.id}.jpg`
                )
              }
              className="rounded-2xl px-4 py-3 bg-gray-500/50 text-gray-200 shadow hover:bg-gray-700/50 flex items-center gap-2"
            >
              <FiDownload /> Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favourites;
