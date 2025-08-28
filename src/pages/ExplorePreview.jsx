import React, { useState, useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";
import { CiHeart } from "react-icons/ci";
import { FiDownload } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
import { usePhotoStore } from "../store/photostore";
import { Link } from "react-router-dom";

function ExplorePreview() {
  const photos = usePhotoStore((state) => state.photos);
  const fetchTrending = usePhotoStore((state) => state.fetchTrending);
  const toggleFavourite = usePhotoStore((state) => state.toggleFavourite);
  const favourites = usePhotoStore((state) => state.favourites);

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    if (photos.length === 0) {
      fetchTrending();
    }
  }, [fetchTrending, photos.length]);

  const isFavourite = (photoId) =>
    favourites.some((fav) => fav.id === photoId);

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
    <section id="explore-preview" className="p-10 bg-[#dedede] text-gray-800">
      <h2 className="text-4xl font-bold mb-6">Explore</h2>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {photos.slice(0, 6).map((photo) => (
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
                onClick={() => toggleFavourite(photo)}
                className={`text-3xl ${
                  isFavourite(photo.id) ? "text-red-600" : "text-gray-400"
                }`}
              >
                <CiHeart />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/explore"
          className="px-6 py-2 text-white shadow-xl bg-gray-600 rounded-lg hover:bg-gray-700 transition"
        >
          See more →
        </Link>
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex justify-center items-center overflow-auto"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white p-4 rounded-lg max-w-4xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-gray-600 bg-white/70 rounded-full text-3xl"
            >
              <ImCancelCircle />
            </button>

            <img
              src={selectedPhoto.src.large2x}
              alt={selectedPhoto.photographer}
              className="rounded-lg w-full h-auto object-contain"
            />

            <div className="mt-4 flex justify-between items-center">
              <p className="text-gray-700 font-normal text-lg">
                Photographer: {selectedPhoto.photographer}
              </p>
              <div className="flex gap-3">
                <a
                  href={selectedPhoto.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row gap-3 justify-center items-center underline rounded-2xl px-4 py-3 text-gray-800"
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
                  className="rounded-2xl px-4 py-3 bg-gray-500/50 text-gray-800 shadow hover:bg-gray-700/50 flex items-center gap-2"
                >
                  <FiDownload /> Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ExplorePreview;
