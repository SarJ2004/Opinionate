"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { Button } from "../ui/button";
import VersoCardMenu from "./VersoCardMenu";
import Link from "next/link";
function VersoCard({
  verso,
  token,
}: {
  verso: VersoType;
  token: string;
}) {
  const expiresAt = new Date(verso.expires_at).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Card
      id={`verso-${verso.id}`}
      className="w-full max-w-sm gap-4 overflow-hidden border-border/60 pb-4 pt-4 transition-all hover:-translate-y-0.5 hover:shadow-md">
      {verso?.image && (
        <div className="px-4">
          <div className="overflow-hidden rounded-lg border border-border/50 bg-muted/30">
            <Image
              src={getImageUrl(verso.image)}
              width={500}
              height={500}
              alt={verso.title}
              className="h-[220px] w-full object-cover"
            />
          </div>
        </div>
      )}

      <CardHeader className="px-4 pb-0">
        <CardTitle className="line-clamp-2 text-lg leading-tight">
          {verso.title}
        </CardTitle>
        <CardAction>
          <VersoCardMenu verso={verso} token={token} />
        </CardAction>
      </CardHeader>

      <CardContent className="px-4 pt-0">
        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
          {verso.description}
        </p>
      </CardContent>

      <CardFooter className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 px-4 pt-4">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Expires
          </p>
          <p className="text-sm font-semibold text-foreground">{expiresAt}</p>
        </div>
        <Link href={`/verso/items/${verso.id}`}>
          <Button variant="outline" size="sm" className="shrink-0">
            Open
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default VersoCard;
