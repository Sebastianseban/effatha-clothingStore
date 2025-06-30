import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useLogout } from "../../hooks/user/useLogout.js";

const UserProfilePopup = ({ onClose }) => {
  const { mutate: logout, isLoading } = useLogout();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="absolute right-4 top-19 z-50 w-64 bg-white border border-gray-200 shadow-xl rounded-xl p-4">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-black transition-colors"
      >
        <IoClose size={18} />
      </button>

      <ul className="space-y-2 text-sm">
        <li>
          <Link  to="/account">
            <button   onClick={onClose} className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
              View Profile
            </button>
          </Link>
        </li>
        <li>
          <button className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
            Order History
          </button>
        </li>
        <li>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition-colors mt-2 disabled:opacity-50"
          >
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserProfilePopup;
