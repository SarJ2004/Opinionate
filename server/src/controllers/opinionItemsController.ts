import { Request, Response } from "express";
import { FileArray, UploadedFile } from "express-fileupload";
import { imageValidator, uploadFile } from "../helper.js";
import prisma from "../config/database.js";

export default function getOpinionItems(req: Request, res: Response) {
  const { id } = req.body;
  const files: FileArray | null | undefined = req.files;
  let imgErrors: Array<string> = [];
  const images = files?.["images[]"] as UploadedFile[];

  if (images.length >= 2) {
    images.forEach((img) => {
      const validMsg = imageValidator(img?.size, img?.mimetype);
      if (validMsg) imgErrors.push(validMsg);
    });
    if (imgErrors.length > 0) {
      res.status(422).json({ errors: imgErrors });
      return;
    }
    let uploadedImages: string[] = [];
    images.map(async (img) => {
      uploadedImages.push(await uploadFile(img));
    });

    uploadedImages.map(async (item) => {
      await prisma.opinionItem.create({
        data: {
          image: item,
          opinion_id: Number(id),
        },
      });
    });
    res.status(200).json({ message: "Opinion items updated successfully!" });
  }

  res
    .status(422)
    .json({ errors: ["Please select atleast 2 images to Opinionate"] });
  return;
}
