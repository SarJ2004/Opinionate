"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import axios, { AxiosError } from "axios";
import { OPINION_URL } from "@/lib/apiEndpoints";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { error } from "console";
import { toast } from "sonner";

function AddOpinion({ user }: { user: CustomUser }) {
  const [open, setOpen] = useState(false);
  const [opinionData, setOpinionData] = useState<OpinionFormType>({});
  const [date, setDate] = React.useState<Date | null>();
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<OpinionFormTypeError>({});
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) setImage(file);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", opinionData?.title ?? "");
      formData.append("description", opinionData?.description ?? "");
      formData.append("expires_at", date?.toISOString() ?? "");
      if (image) formData.append("image", image);
      const { data } = await axios.post(OPINION_URL, formData, {
        headers: {
          Authorization: user.token,
        },
      });
      setLoading(false);
      if (data?.message) {
        setOpinionData({});
        setDate(null);
        setImage(null);
        toast.success("Opinion added successfully!");
        setOpen(false);
      }
    } catch (e) {
      setLoading(false);
      if (e instanceof AxiosError) {
        if (e.response?.status === 422) {
          setErrors(e.response?.data?.errors);
        }
      } else {
        toast.error("Something went wrong, please try again!");
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Opinion</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Create Opinion</DialogTitle>
          <DialogDescription>Add your opinions here!</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <div className="mt-4">
            <Label htmlFor="title" className="mb-2">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Enter your title here:"
              value={opinionData.title ?? ""}
              onChange={(e) =>
                setOpinionData({ ...opinionData, title: e.target.value })
              }
              className="mb-4"
            />
            <span className="text-red-500">{errors?.title}</span>
          </div>
          <div className="mt-4">
            <Label htmlFor="description" className="mb-2">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Please provide a brief description.."
              value={opinionData.description ?? ""}
              onChange={(e) =>
                setOpinionData({ ...opinionData, description: e.target.value })
              }
              className="mb-4"
            />
            <span className="text-red-500">{errors?.description}</span>
          </div>
          <div className="mt-4">
            <Label htmlFor="image" className="mb-2">
              Opinion Image
            </Label>
            <Input
              id="image"
              placeholder="Upload your image here:"
              type="file"
              className="mb-4"
              onChange={handleImageChange}
            />
            <span className="text-red-500">{errors?.image}</span>
          </div>
          <div className="mt-4">
            <Label htmlFor="expires_at" className="mb-2">
              Expiry Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!date}
                  className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground">
                  {date ? date.toDateString() : <span>Pick a date</span>}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date ?? new Date()}
                  onSelect={setDate}
                  defaultMonth={date ?? new Date()}
                />
              </PopoverContent>
            </Popover>
            <span className="text-red-500">{errors?.expires_at}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {loading ? "Processing...." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddOpinion;
