import React, { useState, useEffect } from "react";
import ImageCard from "./components/imageCard";
import ImageSearch from "./components/imageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [term]);

  return (
    <div className="container mx-auto px-2 sm:px-0">
      <ImageSearch searchText={(text) => setTerm(text)} />
      {!isLoading && images.length === 0 && (
        <h1 className="text-5xl text-red-600 text-center mx-auto mt-32">
          Not Loading!
        </h1>
      )}
      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading..</h1>
      ) : (
        <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-4">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
