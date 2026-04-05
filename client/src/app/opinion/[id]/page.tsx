import React from "react";
import Navbar from "@/components/base/Navbar";
import { fetchOpinion } from "@/fetch/opininonFetch";
import Opinionate from "@/components/opinion/Opinionate";

async function opinionItems({ params }: { params: { id: string } }) {
  const id = Number((await params).id);
  const opinion: OpinionType | null = await fetchOpinion(id);

  return (
    <div className="container">
      <Navbar />
      <div className="mt-4">
        <h1 className="text-2xl lg:text-4xl font-extrabold">
          {opinion?.title}
        </h1>
        <p className="text-lg">{opinion?.description}</p>
      </div>
      {opinion && <Opinionate opinion={opinion!} />}
    </div>
  );
}

export default opinionItems;
