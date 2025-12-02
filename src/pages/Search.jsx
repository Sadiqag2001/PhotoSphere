import React, { useState, useEffect } from "react";
import { usePhotoStore } from "../store/photostore";
import { useUserStore } from "../store/userStore";
import { ImCancelCircle } from "react-icons/im";
import { CiHeart } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

function Search() {
  const photos = usePhotoStore((state) => state.photos);
  const lastQuery = usePhotoStore((state) => state.lastQuery);
  const searchPhotos = usePhotoStore((state) => state.searchPhotos);

  const { addFavourite, removeFavourite, favourites } = useUserStore();
  const isFavourite = (id) => favourites.some((f) => f.id === id);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    if (lastQuery) {
      searchPhotos(lastQuery);
    }
  }, [lastQuery, searchPhotos]);


  return (
    <div className="p-10 mt-15">
      <h2 className="text-5xl max-sm:text-2xl text-gray-800 font-bold mb-6">Search results</h2>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {photos.length > 0 ? (
          photos.map((photo) => (
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
                  onClick={() =>
                    isFavourite(photo.id)
                      ? removeFavourite(photo.id)
                      : addFavourite(photo)
                  }
                  className={`text-4xl ${
                    isFavourite(photo.id) ? "text-red-600" : "text-gray-600"
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

export default Search;
