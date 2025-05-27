import { NavLink } from "react-router-dom";
import { FiBox, FiShoppingCart, FiTruck, FiUsers } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: MdDashboard },
  { name: "Products", path: "/admin/admin-products", icon: FiBox },
  { name: "Orders", path: "/admin/orders", icon: FiShoppingCart },
  { name: "Delivery", path: "/admin/delivery", icon: FiTruck },
  { name: "Users", path: "/admin/users", icon: FiUsers },
];

const SideBar = () => {
  return (
    <aside className="w-full bg-white shadow-lg h-screen sticky top-0 pr-6 pt-6 flex flex-col">
      <nav className="flex flex-col gap-4">
        {navItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg text-md font-medium transition-colors
              ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 shadow"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`
            }
          >
            <Icon className="text-xl" />
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
