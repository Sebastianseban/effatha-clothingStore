import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserStore from "./store/userStore";
import axiosInstance from "./api/axiosInstance";

function App() {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const [loading, setLoading] = useState(true); // 👈 loading state

  useEffect(() => {
    const restoreSession = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await axiosInstance.get("/users/me", {
          withCredentials: true,
        });
        setUser(res.data.data);
      } catch (error) {
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
     
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
