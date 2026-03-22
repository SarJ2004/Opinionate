import React, { Dispatch, SetStateAction } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

function LogoutModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const logOutUser = () => {
    signOut({
      callbackUrl: "/login",
      redirect: true,
    });
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <LogOutIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Log out?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out of this account?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="secondary">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={logOutUser}>
            Proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LogoutModal;
