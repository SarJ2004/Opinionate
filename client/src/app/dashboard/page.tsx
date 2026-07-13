"use server";
import Navbar from "@/components/base/Navbar";
import AddVerso from "@/components/verso/AddVerso";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { fetchVersos } from "@/fetch/versoFetch";
import VersoCard from "@/components/verso/VersoCard";
async function Dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const versos: Array<VersoType> | [] = await fetchVersos(
    session?.user?.token!,
  );
  // console.log("The versos are: ", versos);
  return (
    <div className="container">
      <Navbar name={session?.user?.name!} />
      <div className="text-end mt-10">
        <AddVerso user={session?.user!} />
      </div>
      <div className="flex space-x-5 flex-wrap space-y-4 items-center">
        {versos.length > 0 &&
          versos.map((item, index) => (
            <VersoCard
              verso={item}
              key={index}
              token={session?.user?.token!}
            />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
