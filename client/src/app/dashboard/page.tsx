"use server";
import Navbar from "@/components/base/Navbar";
import AddOpinion from "@/components/opinion/AddOpinion";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

async function Dashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <div className="container">
      <Navbar name={session?.user?.name!} />
      <div className="text-end mt-10">
        <AddOpinion user={session?.user!} />
      </div>
    </div>
  );
}

export default Dashboard;
