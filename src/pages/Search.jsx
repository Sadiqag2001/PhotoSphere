import React, {useState, useEffect} from 'react';
import { usePhotoStore } from '../store/photostore';
import { ImCancelCircle } from "react-icons/im";
import { CiHeart } from 'react-icons/ci';

function Search() {
  const photos = usePhotoStore((state) => state.photos);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [likedPhotos, setLikedPhotos] = useState({});
  const lastQuery = usePhotoStore((state) => state.lastQuery);
  const searchPhotos = usePhotoStore((state) => state.searchPhotos);

    useEffect(() => {
    if (lastQuery) {
      searchPhotos(lastQuery);
    }
  }, [lastQuery, searchPhotos]);

  const toggleLike = (id) => {
    setLikedPhotos((prev) => ({ ...prev, [id]: !prev[id] }));
  };


  return (
    <div className='p-10 mt-15'>
      <h2 className='text-5xl text-gray-800 font-bold mb-6'>Search results</h2>
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
                  onClick={() => toggleLike(photo.id)}
                  className={`text-4xl ${
                    likedPhotos[photo.id] ? "text-red-600" : "text-gray-600"
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
        <div className="fixed overflow-auto shadow-2xl h-full w-full inset-0 flex justify-center items-start bg-black/70 backdrop-blur-lg z-50" onClick={() => setSelectedPhoto(null)}>
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedPhoto(null)} className="absolute top-5 right-5 text-gray-600 bg-white/70 rounded-full text-5xl"> <ImCancelCircle /></button>
            <img src={selectedPhoto.src.large} alt={selectedPhoto.photographer} className="rounded-lg w-full h-full" />
            <div className="mt-3 flex justify-between items-center">
              <p className="text-gray-700 font-normal text-lg">Photographer: {selectedPhoto.photographer}</p>
              <a  href={selectedPhoto.url} target="_blank" rel="noopener noreferrer" className="rounded-2xl px-5 py-3 bg-gray-800 text-white shadow hover:bg-gray-900">View on Pexels</a>
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
      )}

    </div>
  );
}

export default Search;


// import React, { useState, useEffect } from "react";
// import { usePhotoStore } from "../store/photostore";
// import { ImCancelCircle } from "react-icons/im";
// import { CiHeart } from "react-icons/ci";

// function Search() {
//   const photos = usePhotoStore((state) => state.photos);
//   const lastQuery = usePhotoStore((state) => state.lastQuery);
//   const searchPhotos = usePhotoStore((state) => state.searchPhotos);

//   const [selectedPhoto, setSelectedPhoto] = useState(null);
//   const [likedPhotos, setLikedPhotos] = useState({});

//   // 🔑 When Search page loads, re-run last search if it exists
//   useEffect(() => {
//     if (lastQuery) {
//       searchPhotos(lastQuery);
//     }
//   }, [lastQuery, searchPhotos]);

//   const toggleLike = (id) => {
//     setLikedPhotos((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   return (
//     <div className="p-10 mt-15">
//       <h2 className="text-5xl text-gray-800 font-bold mb-6">Search results</h2>
//       <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
//         {photos.length > 0 ? (
//           photos.map((photo) => (
//             <div
//               key={photo.id}
//               className="break-inside-avoid rounded-lg overflow-hidden shadow-md hover:brightness-75 duration-300 ease-in-out"
//             >
//               <img
//                 src={photo.src.medium}
//                 srcSet={`${photo.src.medium} 640w, ${photo.src.large} 940w, ${photo.src.large2x} 1880w`}
//                 sizes="(max-width: 768px) 100vw, 33vw"
//                 alt={photo.photographer}
//                 className="w-full h-auto rounded-lg cursor-pointer"
//                 onClick={() => setSelectedPhoto(photo)}
//               />
//               <div className="flex justify-between items-center px-2 py-2">
//                 <p className="font-normal text-sm">By {photo.photographer}</p>
//                 <button
//                   onClick={() => toggleLike(photo.id)}
//                   className={`text-4xl ${
//                     likedPhotos[photo.id] ? "text-red-600" : "text-gray-600"
//                   }`}
//                 >
//                   <CiHeart />
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 py-10">
//             No results found. Try another search.
//           </p>
//         )}
//       </div>

//       {selectedPhoto && (
//         <div
//           className="fixed overflow-auto shadow-2xl h-full w-full inset-0 flex justify-center items-start bg-black/70 backdrop-blur-lg z-50"
//           onClick={() => setSelectedPhoto(null)}
//         >
//           <div
//             className="bg-white p-4 rounded-lg max-w-3xl w-full relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setSelectedPhoto(null)}
//               className="absolute top-5 right-5 text-gray-600 bg-white/70 rounded-full text-5xl"
//             >
//               <ImCancelCircle />
//             </button>
//             <img
//               src={selectedPhoto.src.large}
//               alt={selectedPhoto.photographer}
//               className="rounded-lg w-full h-full"
//             />
//             <div className="mt-3 flex justify-between items-center">
//               <p className="text-gray-700 font-normal text-lg">
//                 Photographer: {selectedPhoto.photographer}
//               </p>
//               <a
//                 href={selectedPhoto.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="rounded-2xl px-5 py-3 bg-gray-800 text-white shadow hover:bg-gray-900"
//               >
//                 View on Pexels
//               </a>
//               <a
//                 href={selectedPhoto.src.original}
//                 download
//                 className="rounded-2xl px-4 py-2 bg-blue-600 text-white shadow hover:bg-blue-700"
//               >
//                 Download
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Search;
