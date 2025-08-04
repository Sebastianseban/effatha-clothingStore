import React from "react";
import CollectionCard from "../components/CollectionCard";

const CollectionPage = () => {
  return (
    <div className="w-full  px-16 py-3  ">
      <h2 className="text-3xl font-semibold mb-4">Collections</h2>
      <div className="grid grid-cols-3 gap-6">
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
      </div>
    </div>
  );
};

export default CollectionPage;
