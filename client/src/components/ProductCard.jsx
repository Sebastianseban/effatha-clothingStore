import { FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProductCard = ({
  image,
  title,
  brand,
  color,
  price,
  onAddToCartClick,
  slug,
}) => {
  return (
    <Link to={`/product/${slug}`} className="block">
      <div className="bg-gray-50 shadow-md overflow-hidden min-w-[300px] relative">
        <img
          src={image}
          alt={title}
          className="w-[300px] h-[300px] object-contain hover:scale-105 transition-transform duration-300"
        />

        <div className="p-4 bg-white">
          <div className="flex justify-between items-start">
            <h2 className="text-sm text-gray-900">{brand}</h2>

            <FiPlusCircle
              className="hover:scale-105 text-2xl cursor-pointer text-gray-700 hover:text-black transition z-10"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCartClick();
              }}
            />
          </div>

          <h1 className="text-black text-[18px] font-medium mt-1">{title}</h1>
          <p className="text-sm text-gray-500">{color}</p>
          <p className="text-sm font-semibold text-gray-950">₹{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
