import HeroSection from "@/components/base/HeroSection";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

async function page() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      {/* <p>{JSON.stringify(session)}</p> */}
      <h1>
        <HeroSection />
      </h1>
    </div>
  );
}

export default page;
