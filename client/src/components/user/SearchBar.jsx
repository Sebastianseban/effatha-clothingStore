// import React, { useState } from "react";
// import { IoIosSearch } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import { useDebounce } from "use-debounce"; // ✅ NEW
// import useSearchProducts from "../../hooks/user/useSearchProducts";

// const SearchBar = () => {
//   const [query, setQuery] = useState("");
//   const [debouncedQuery] = useDebounce(query.trim(), 300); 
//   const navigate = useNavigate();

//   const { data: suggestions = [], isLoading } = useSearchProducts(debouncedQuery, {
//     enabled: !!debouncedQuery,
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!query.trim()) return;
//     navigate(`/search?q=${encodeURIComponent(query.trim())}`);
//   };

//   const handleSuggestionClick = (title) => {
//     navigate(`/search?q=${encodeURIComponent(title)}`);
//     setQuery(""); 
//   };

//   return (
//     <div className="relative w-full max-w-xs">
//       <form onSubmit={handleSubmit} className="relative flex">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search products..."
//           className="block w-full pr-12 pl-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:border-blue-400 focus:bg-white transition shadow-sm"
//           aria-label="Search products"
//         />
//         <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
//           {isLoading && (
//             <svg
//               className="animate-spin h-5 w-5 text-blue-500"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               role="status"
//               aria-label="Loading"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8v4l2.5-2.5L12 4v4a8 8 0 01-8 8z"
//               />
//             </svg>
//           )}
//           <button
//             type="submit"
//             className="text-gray-500 hover:text-blue-500 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
//             aria-label="Search"
//           >
//             <IoIosSearch className="text-xl" />
//           </button>
//         </div>
//       </form>

//       {/* Suggestion Dropdown */}
//       {debouncedQuery && suggestions.length > 0 && (
//         <ul
//           className="
//             absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md
//             shadow-lg max-h-60 overflow-y-auto
//             scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
//             transition-opacity duration-200 ease-in
//           "
//           role="listbox"
//         >
//           {suggestions.map((product) => (
//             <li
//               key={product._id}
//               onClick={() => handleSuggestionClick(product.title)}
//               className="px-4 py-3 text-sm text-gray-800 hover:bg-blue-100 cursor-pointer select-none focus:bg-blue-100 transition-colors"
//               role="option"
//               tabIndex={0}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" || e.key === " ") {
//                   e.preventDefault();
//                   handleSuggestionClick(product.title);
//                 }
//               }}
//             >
//               {product.title}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchBar;
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import useSearchProducts from "../../hooks/user/useSearchProducts";

const highlightMatch = (text, query) => {
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <>
      {before}
      <span className="bg-yellow-200 font-semibold">{match}</span>
      {after}
    </>
  );
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query.trim(), 300);
  const navigate = useNavigate();

  const { data: suggestions = [], isLoading } = useSearchProducts(debouncedQuery, {
    enabled: !!debouncedQuery,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSuggestionClick = (title) => {
    navigate(`/search?q=${encodeURIComponent(title)}`);
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-xs">
      <form onSubmit={handleSubmit} className="relative flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="block w-full pr-12 pl-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:border-blue-400 focus:bg-white transition shadow-sm"
          aria-label="Search products"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
          {isLoading && (
            <svg
              className="animate-spin h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              role="status"
              aria-label="Loading"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l2.5-2.5L12 4v4a8 8 0 01-8 8z"
              />
            </svg>
          )}
          <button
            type="submit"
            className="text-gray-500 hover:text-blue-500 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            aria-label="Search"
          >
            <IoIosSearch className="text-xl" />
          </button>
        </div>
      </form>

      {debouncedQuery && suggestions.length > 0 && (
        <ul
          className="
            absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md
            shadow-lg max-h-60 overflow-y-auto
            scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
            transition-opacity duration-200 ease-in
          "
          role="listbox"
        >
          {suggestions.map((product) => (
            <li
              key={product._id}
              onClick={() => handleSuggestionClick(product.title)}
              className="px-4 py-3 text-sm text-gray-800 hover:bg-blue-100 cursor-pointer select-none focus:bg-blue-100 transition-colors"
              role="option"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSuggestionClick(product.title);
                }
              }}
            >
              {highlightMatch(product.title, query)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
