import React, { useState } from 'react';
import { ImCancelCircle } from "react-icons/im";
import { CiHeart } from "react-icons/ci";

function Explore({ photos = [] }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [likedPhotos, setLikedPhotos] = useState({});

  const toggleLike = (id) => {
    setLikedPhotos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-10">
      <h2 className="text-5xl text-gray-800 font-bold mb-6">Explore</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div
              key={photo.id}
              className="rounded-lg flex flex-col gap-3 shadow-md p-2"
            >
              <img
                src={photo.src.medium}
                alt={photo.photographer}
                className="rounded-lg cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              />
              <div className="flex justify-between items-center px-2">
                <p className="font-normal text-sm">
                  By {photo.photographer}
                </p>
                <button
                  onClick={() => toggleLike(photo.id)}
                  className={`text-2xl ${
                    likedPhotos[photo.id] ? "text-red-500" : "text-gray-600"
                  }`}
                >
                  <CiHeart />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 py-10">
            No results found. Try another search.
          </p>
        )}
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex justify-center items-center overflow-auto"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white p-4 rounded-lg max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-gray-600 bg-white/70 rounded-full text-3xl"
            >
              <ImCancelCircle />
            </button>

            <img
              src={selectedPhoto.src.large}
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
                  className="rounded-2xl px-4 py-2 bg-gray-800 text-white shadow hover:bg-gray-900"
                >
                  View on Pexels
                </a>
                <a
                  href={selectedPhoto.src.original}
                  download
                  className="rounded-2xl px-4 py-2 bg-blue-600 text-white shadow hover:bg-blue-700"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Explore;
