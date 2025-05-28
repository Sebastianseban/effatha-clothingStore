import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import Cart from "./components/Cart";
import { useEffect } from "react";
import useUserStore from "./store/userStore";
import axiosInstance from "./api/axiosInstance";

function App() {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const restoreSession = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) return;
      try {
        const res = await axiosInstance.get("/users/me", {
          withCredentials: true,
        });
        console.log(res.data)
        setUser(res.data.data); 
      } catch (error) {
        clearUser(); 
      }
    };

    restoreSession();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />  
    </div>
  );
}

export default App;
