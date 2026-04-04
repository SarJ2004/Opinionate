"use client";
import { Upload } from "lucide-react";
import React, { useState, useRef, ChangeEvent } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { OPINION_ITEMS_URL } from "@/lib/apiEndpoints";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
function AddOpinionItems({
  token,
  opinionId,
}: {
  token: string;
  opinionId: number;
}) {
  const router = useRouter();
  const [items, setItems] = useState<Array<ClashItemForm>>([
    { image: null },
    { image: null },
  ]);
  const [urls, setUrls] = useState(["", ""]);
  const [loading, setLoading] = useState(false);
  const imgRef1 = useRef<HTMLInputElement | null>(null);
  const imgRef2 = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedItems = [...items];
      updatedItems[index].image = file;
      setItems(updatedItems);
      const imageUrl = URL.createObjectURL(file);
      const updatedURLs = [...urls];
      updatedURLs[index] = imageUrl;
      setUrls(updatedURLs);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!token) {
        toast.error("Your session has expired. Please log in again.");
        router.push("/login");
        return;
      }

      setLoading(true);
      const formData = new FormData();
      formData.append("id", opinionId.toString());
      items.forEach((item) => {
        if (item.image) {
          formData.append("images[]", item.image);
        }
      });
      if (formData.get("images[]")) {
        const { data } = await axios.post(OPINION_ITEMS_URL, formData, {
          headers: {
            Authorization: token,
          },
        });
        if (data?.message) {
          toast.success(data?.message);
          setTimeout(() => router.push("/dashboard"), 1000);
        }
        setLoading(false);
      } else {
        toast.warning("Please upload both images");
      }
    } catch (e) {
      setLoading(false);
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          toast.error("Unauthorized request. Please log in again.");
          router.push("/login");
          return;
        }
        if (e.response?.status === 422) {
          if (e?.response.data?.errors)
            e?.response.data?.errors?.map((err: string) => toast.error(err));
        }
      } else {
        toast.error("Something went wrong, please try again!");
      }
    }
  };

  return (
    <div className="mt-10 w-full">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14">
        <div className="w-full max-w-[500px]">
          <input
            type="file"
            className="hidden"
            ref={imgRef1}
            onChange={(e) => handleImageChange(e, 0)}
          />
          <div
            className="h-[300px] w-full rounded-md border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center"
            onClick={() => imgRef1?.current?.click()}>
            {urls.length > 0 && urls?.[1] !== "" ? (
              <Image
                src={urls?.[0]}
                height={500}
                width={500}
                alt="opinion2"
                className="w-full h-[300px] object-contain"
              />
            ) : (
              <h1 className="flex items-center gap-2 text-xl font-medium text-slate-800">
                <Upload className="h-5 w-5" />
                <span>Upload file</span>
              </h1>
            )}
          </div>
        </div>

        <h2 className="text-5xl font-extrabold leading-none text-fuchsia-500">
          VS
        </h2>

        <div className="w-full max-w-[500px]">
          <input
            type="file"
            className="hidden"
            ref={imgRef2}
            onChange={(e) => handleImageChange(e, 1)}
          />
          <div
            className="h-[300px] w-full rounded-md border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center"
            onClick={() => imgRef2?.current?.click()}>
            {urls.length > 0 && urls?.[1] !== "" ? (
              <Image
                src={urls?.[1]}
                height={500}
                width={500}
                alt="opinion1"
                className="w-full h-[300px] object-contain"
              />
            ) : (
              <h1 className="flex items-center gap-2 text-xl font-medium text-slate-800">
                <Upload className="h-5 w-5" />
                <span>Upload file</span>
              </h1>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button className="w-52" onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing" : "Submit"}
        </Button>
      </div>
    </div>
  );
}

export default AddOpinionItems;
