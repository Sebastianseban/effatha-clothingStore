// import { FiPlusCircle } from "react-icons/fi";
// import { Link } from "react-router-dom";

// const ProductCard = ({
//   image,
//   title,
//   brand,
//   color,
//   price,
//   onAddToCartClick,
//   slug,
// }) => {
//   return (
//     <div className="bg-gray-50 shadow-md overflow-hidden min-w-[300px]">
//       {/* Make only image and title linkable */}
//       <Link to={`/product/${slug}`}>
//         <img
//           src={image}
//           className="w-[300px] h-[300px] object-contain hover:scale-105 transition-transform duration-300"
//           alt={title}
//         />
//       </Link>

//       <div className="p-4 bg-white">
//         <div className="flex justify-between">
//           <h2 className="text-sm text-gray-900">{brand}</h2>
//           <FiPlusCircle
//             onClick={onAddToCartClick}
//             className="hover:scale-105 text-2xl cursor-pointer"
//           />
//         </div>
//         <Link to={`/product/${slug}`}>
//           <h1 className="text-black text-[18px] font-medium mt-1">{title}</h1>
//         </Link>
//         <p className="text-sm text-gray-500">{color}</p>
//         <p className="text-sm font-semibold text-gray-950">₹{price}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
// import { FiPlusCircle } from "react-icons/fi";
// import { Link } from "react-router-dom";

// const ProductCard = ({
//   image,
//   title,
//   brand,
//   color,
//   price,
//   onAddToCartClick,
//   slug,
// }) => {
//   return (
//     <div className="bg-gray-50 shadow-md overflow-hidden min-w-[300px]">

//       {/* Make image link to product */}
//       <Link to={`/product/${slug}`}>
//         <img
//           src={image}
//           alt={title}
//           className="w-[300px] h-[300px] object-contain hover:scale-105 transition-transform duration-300"
//         />
//       </Link>

//       <div className="p-4 bg-white">
//         <div className="flex justify-between items-start">
//           <h2 className="text-sm text-gray-900">{brand}</h2>
//           <FiPlusCircle
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               onAddToCartClick();
//             }}
//             className="hover:scale-105 text-2xl cursor-pointer text-gray-700 hover:text-black transition"
//           />
//         </div>

//         {/* Title is also clickable */}
//         <Link to={`/product/${slug}`}>
//           <h1 className="text-black text-[18px] font-medium mt-1">
//             {title}
//           </h1>
//         </Link>

//         <p className="text-sm text-gray-500">{color}</p>
//         <p className="text-sm font-semibold text-gray-950">₹{price}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
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
        {/* Product Image */}
        <img
          src={image}
          alt={title}
          className="w-[300px] h-[300px] object-contain hover:scale-105 transition-transform duration-300"
        />

        {/* Content */}
        <div className="p-4 bg-white">
          <div className="flex justify-between items-start">
            <h2 className="text-sm text-gray-900">{brand}</h2>

            {/* Plus Icon (Excluded from link navigation) */}
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
