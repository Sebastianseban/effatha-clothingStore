import React from "react";
import Section1 from "../components/HomePage/Section1";

import Section2 from "../components/HomePage/Section2";

const HomePage = () => {
  return (
    <div>
      <Section1 />
      <div className="px-8">
        <Section2
          title="NEW ARRIVAL"
          viewAllLink="/collections/new-arrivals"
          type="new_arrival"
        />

        <Section2 title="BEST SELLER" type="best_seller"  viewAllLink="/collections/best-sellers"/>
      </div>
    </div>
  );
};

export default HomePage;
