import React from "react";
import CollectionCard from "../components/CollectionCard";
import { useCollections } from "../hooks/user/useCollections";

const CollectionPage = () => {
  const { data, isLoading, isError } = useCollections();

  if (isLoading) {
    return <p className="px-16 py-3">Loading collections...</p>;
  }

  if (isError) {
    return (
      <p className="px-16 py-3 text-red-500">Failed to load collections</p>
    );
  }

  return (
    <div className="w-full px-16 py-3">
      <h2 className="text-3xl font-semibold mb-4">Collections</h2>
      <div className="grid grid-cols-3 gap-6">
        {data?.map((collection) => (
          <CollectionCard
            key={collection.category}
            title={collection.category}
            products={collection.products}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage