import React from "react";
import Navbar from "@/components/base/Navbar";
import { fetchVerso } from "@/fetch/versoFetch";
import AddVersoItem from "@/components/verso/AddVersoItem";
import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ViewVersoItems from "@/components/verso/ViewVersoItems";

async function AddItem({ params }: { params: Promise<{ id: string }> }) {
  const id = Number((await params).id);
  const verso: VersoType | null = await fetchVerso(id);
  const session: CustomSession | null = await getServerSession(authOptions);

  if (!session?.user?.token) {
    redirect("/login");
  }

  return (
    <div className="container">
      <Navbar />
      <div className="mt-4">
        <h1 className="text-2xl lg:text-4xl font-extrabold">
          {verso?.title}
        </h1>
        <p className="text-lg">{verso?.description}</p>
      </div>
      {verso?.versoItems && verso.versoItems.length > 0 ? (
        <ViewVersoItems verso={verso} />
      ) : (
        <AddVersoItem token={session?.user?.token} versoId={id} />
      )}
    </div>
  );
}

export default AddItem;
