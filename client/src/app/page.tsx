import HeroSection from "@/components/base/HeroSection";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

async function page() {
  const session = await getServerSession(authOptions);

  console.log("nextauth session:", session);
  console.log("backend bearer token:", session?.user?.token);

  return (
    <div>
      <h1>
        <HeroSection />
      </h1>
    </div>
  );
}

export default page;
