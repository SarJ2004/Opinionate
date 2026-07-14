import React from "react";
import Navbar from "@/components/base/Navbar";
import { fetchVerso } from "@/fetch/versoFetch";
import Verso from "@/components/verso/Verso";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

async function versoItems({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || "Someone";

  const id = Number((await params).id);
  const verso: VersoType | null = await fetchVerso(id);

  return (
    <div className="container">
      <Navbar />
      <div className="mt-4">
        <h1 className="text-2xl lg:text-4xl font-extrabold">
          {verso?.title}
        </h1>
        <p className="text-lg">{verso?.description}</p>
      </div>
      {verso && <Verso verso={verso!} userName={userName} />}
    </div>
  );
}

export default versoItems;
