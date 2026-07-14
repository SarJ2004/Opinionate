"use server";
import Navbar from "@/components/base/Navbar";
import AddVerso from "@/components/verso/AddVerso";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { fetchVersos, fetchTrendingVersos } from "@/fetch/versoFetch";
import VersoCard from "@/components/verso/VersoCard";
async function Dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const versos: Array<VersoType> | [] = await fetchVersos(
    session?.user?.token!,
  );
  const trendingVersos: Array<VersoType> | [] = await fetchTrendingVersos();
  // console.log("The versos are: ", versos);
  return (
    <div className="container pb-10">
      <Navbar name={session?.user?.name!} />
      <div className="text-end mt-10">
        <AddVerso user={session?.user!} />
      </div>

      {trendingVersos.length > 0 && (
        <div className="mt-8 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <h2 className="text-2xl font-bold text-red-500">Trending Right Now</h2>
          </div>
          <div className="flex space-x-5 flex-wrap space-y-4 items-center">
            {trendingVersos.map((item, index) => (
              <VersoCard
                verso={item}
                key={item.id}
                token={session?.user?.token!}
              />
            ))}
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">Your Recent Polls</h2>
      <div className="flex space-x-5 flex-wrap space-y-4 items-center">
        {versos.length > 0 ? (
          versos.map((item, index) => (
            <VersoCard
              verso={item}
              key={item.id}
              token={session?.user?.token!}
            />
          ))
        ) : (
          <div className="text-muted-foreground italic">You haven't created any polls yet.</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
