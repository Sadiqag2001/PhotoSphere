import { usePhotoStore } from "../store/photostore";

function Favourites() {
  const favourites = usePhotoStore((state) => state.favourites);

  if (favourites.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No favourites yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 mt-16">
      {favourites.map((photo) => (
        <img 
          key={photo.id} 
          src={photo.src.medium} 
          alt={photo.alt} 
          className="w-full h-auto rounded-lg shadow-md" 
        />
      ))}
    </div>
  );
}

export default Favourites;
