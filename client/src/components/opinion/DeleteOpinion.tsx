import React, { Dispatch, SetStateAction, useState } from "react";

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
} from "@/components/ui/alert-dialog";
import { DeleteIcon } from "lucide-react";
import { toast } from "sonner";
import { OPINION_URL } from "@/lib/apiEndpoints";
import axios from "axios";
import { clearCache } from "@/actions/commonActions";

function DeleteOpinion({
  open,
  setOpen,
  id,
  token,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: Number;
  token: string;
}) {
  const [loading, setLoading] = useState(false);
  const deleteOpinion = async () => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${OPINION_URL}/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (data?.message) {
        setLoading(false);
        clearCache("dashboard");
        toast.success(data.message);
      }
    } catch (e) {
      toast.error("Something went wrong, please try again!");
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <DeleteIcon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Opinion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you delete this Opinion?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="secondary">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={deleteOpinion}
            disabled={loading}>
            {loading ? "Processing" : "Proceed"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteOpinion;
