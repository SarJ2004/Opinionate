import React from "react";
import Navbar from "@/components/base/Navbar";
function opinionItems({ params }: { params: { id: number } }) {
  return (
    <div className="container">
      <Navbar />
      <div className="mt-4">
        <h1 className="text-2xl lg:text-4xl font-extrabold">Opinion Title</h1>
        <p className="text-lg">Opinion Description</p>
      </div>
    </div>
  );
}

export default opinionItems;
