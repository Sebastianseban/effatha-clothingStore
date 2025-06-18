import React, { useState } from "react";

const ProductImages = ({ images }) => {
  const [zoomImage, setZoomImage] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (url) => {
    setZoomImage(url);
  };

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setZoomImage(null);
  };

  return (
    <div className="relative  h-[800px] bg-center grid grid-cols-2 gap-3">
      {images.map((url, i) => (
        <div
          key={i}
          className="bg-gray-200 relative overflow-hidden cursor-zoom-in"
          onMouseEnter={() => handleMouseEnter(url)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img src={url} alt={`Product ${i}`} className="w-full h-[400px] " />
        </div>
      ))}

      {/* Zoom Preview */}
      {zoomImage && (
        <div className="absolute top-0 right-[-510px] w-[500px] h-[500px] border shadow-lg overflow-hidden z-50 bg-white">
          <div
            className="w-full h-full bg-no-repeat bg-contain"
            style={{
              backgroundImage: `url(${zoomImage})`,
              backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
              backgroundSize: "200%", // Zoom factor
            }}
          ></div>
        </div>
      )}
    </div>
  );
};
export default ProductImages