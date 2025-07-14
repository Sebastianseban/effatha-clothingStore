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
          viewAllLink="/collections/newArrivals"
          type="new_arrival"
        />

        <Section2 title="BEST SELLER" type="best_seller" />
      </div>
    </div>
  );
};

export default HomePage;
