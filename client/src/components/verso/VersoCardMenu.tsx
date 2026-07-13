"use client";

import React, { Suspense, useState } from "react";
import { Copy, EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dynamic from "next/dynamic";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import DeleteVerso from "./DeleteVerso";
import Env from "@/lib/env";

const EditVerso = dynamic(() => import("./EditVerso"));

function VersoCardMenu({
  verso,
  token,
}: {
  verso: VersoType;
  token: string;
}) {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleCopyLink = async () => {
    navigator.clipboard?.writeText(`${Env.CLIENT_URL}/verso/${verso.id}`);
    toast.success("Link copied succesfully!");
  };
  return (
    <>
      {open && (
        <Suspense fallback={<p>Loading.....</p>}>
          <EditVerso
            open={open}
            setOpen={setOpen}
            verso={verso}
            token={token}
          />
        </Suspense>
      )}
      {deleteOpen && (
        <Suspense fallback={<p>Loading.....</p>}>
          <DeleteVerso
            open={deleteOpen}
            setOpen={setDeleteOpen}
            id={verso.id}
            token={token}
          />
        </Suspense>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-full"
            aria-label="Open verso menu">
            <EllipsisVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onClick={handleCopyLink}>
            <Copy className="size-4" />
            Copy link
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Pencil className="size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setDeleteOpen(true)}>
            <Trash2 className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default VersoCardMenu;
