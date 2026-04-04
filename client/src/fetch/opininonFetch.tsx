import { OPINION_URL } from "@/lib/apiEndpoints";

export async function fetchOpinions(token: string) {
  // since this is a private route, it would need a token
  const res = await fetch(OPINION_URL, {
    headers: {
      Authorization: token,
    },
    next: {
      //this defines how long can we cache data
      revalidate: 60 * 60,
      tags: ["dashboard"], // define the name of the cache key pair
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return [];
}

export async function fetchOpinion(id: number) {
  const res = await fetch(`${OPINION_URL}/${id}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return null;
}
