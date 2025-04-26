import React from "react";
import Section1 from "../components/HomePage/Section1";
import NavBar from "../components/NavBar";
import Section2 from "../components/HomePage/Section2";
import SideBar from "../components/SideBar";


const HomePage = () => {
  return (
    <div>
   <Section1/>
  <div className="px-8" >
  <Section2 title="NEW ARRIVAL" viewAllLink="/collections/newArrivals"/>
  <Section2 title="BEST SELLER"/>
  </div>

   

    </div>
  );
};

export default HomePage;
