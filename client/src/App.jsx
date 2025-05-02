
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer"
import { Outlet } from "react-router-dom";
import Cart from "./components/Cart";
  

function App() {
  return (
    <div>
   
    <NavBar/>
    <Outlet/>
    <Footer />

  </div>
  )

}

export default App;
