import React, { useState } from "react";

const ImageWithPlaceholder = ({ src, placeholderSrc, alt }) => {
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc);

  const handleImageLoad = () => {
    setCurrentSrc(src);
  };

  return (
    <div className="image-container">
      <img src={currentSrc} alt={alt} onLoad={handleImageLoad} />
    </div>
  );
};

export default ImageWithPlaceholder;
