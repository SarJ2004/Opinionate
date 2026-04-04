import React from "react";
import Navbar from "@/components/base/Navbar";
import { fetchOpinion } from "@/fetch/opininonFetch";
import AddOpinionItem from "@/components/opinion/AddOpinionItem";
import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function opinionItems({ params }: { params: { id: string } }) {
  const id = Number((await params).id);
  const opinion: OpinionType | null = await fetchOpinion(id);
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session?.user?.token) {
    redirect("/login");
  }

  return (
    <div className="container">
      <Navbar />
      <div className="mt-4">
        <h1 className="text-2xl lg:text-4xl font-extrabold">
          {opinion?.title}
        </h1>
        <p className="text-lg">{opinion?.description}</p>
      </div>
      <AddOpinionItem token={session.user.token} opinionId={id} />
    </div>
  );
}

export default opinionItems;
