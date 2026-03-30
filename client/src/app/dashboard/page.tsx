"use server";
import Navbar from "@/components/base/Navbar";
import AddOpinion from "@/components/opinion/AddOpinion";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { fetchOpinions } from "../../fetch/opininonFetch";
import OpinionCard from "@/components/opinion/OpinionCard";
async function Dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const opinions: Array<OpinionType> | [] = await fetchOpinions(
    session?.user?.token!,
  );
  // console.log("The opinions are: ", opinions);
  return (
    <div className="container">
      <Navbar name={session?.user?.name!} />
      <div className="text-end mt-10">
        <AddOpinion user={session?.user!} />
      </div>
      <div className="flex space-x-5 flex-wrap space-y-4 items-center">
        {opinions.length > 0 &&
          opinions.map((item, index) => (
            <OpinionCard
              opinion={item}
              key={index}
              token={session?.user?.token!}
            />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
