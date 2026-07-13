import { Request, Response } from "express";
import { ZodError } from "zod";
import { versoSchema } from "../validation/versoValidation.js";
import {
  deleteFile,
  formatError,
  imageValidator,
  uploadFile,
} from "../helper.js";
import prisma from "../config/database.js";
import { UploadedFile } from "express-fileupload";
export const setVersos = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = versoSchema.parse(body);
    let uploadedImage: string;
    //check if files exist and are valid images
    if (req.files?.image) {
      const image = req.files.image as UploadedFile; //this is either going to be a single file or an array of files.
      //but we already ensure that only single file is getting passed from the frontend.
      const validationMsg = imageValidator(image.size, image.mimetype);
      if (validationMsg) {
        res.status(422).json({
          message: "Image validation failed",
          errors: { image: validationMsg },
        });
        return;
      }
      uploadedImage = await uploadFile(image); //get the public_id of cloudinary image.
    } else {
      res.status(422).json({ errors: { image: "Image field is required!" } });
      return;
    }
    await prisma.verso.create({
      data: {
        ...payload,
        image: uploadedImage,
        user_id: req.user?.id!,
        expires_at: new Date(payload.expires_at),
      },
    });
    res.status(201).json({ message: "Verso created successfully!" });
    return;
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error);
      res.status(422).json({
        message: "Validation failed",
        errors: formatError(error),
      });
      return;
    }
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
      error: error,
    });
    return;
  }
};

export const getVersos = async (req: Request, res: Response) => {
  try {
    const versos = await prisma.verso.findMany({
      where: {
        user_id: req.user?.id, //auth info is passed on to the request  using authMiddleware..
      },
      orderBy: {
        id: "desc",
      },
    });
    res
      .status(200)
      .json({ message: "Versos fetched successfully!", data: versos });
  } catch (error) {
    res.status(500).json({ message: "something went wrong :(" });
    return;
  }
};

export const getVerso = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const verso = await prisma.verso.findUnique({
      //we can select specific fields to show, instead of the entire json like only id and desc using select key
      where: {
        id: Number(id),
      },
      include: {
        versoItems: {
          orderBy: {
            id: "desc",
          },
          select: {
            image: true,
            id: true,
            count: true,
          },
        },
        versoComments: {
          select: {
            id: true,
            comment: true,
            created_at: true,
          },
          orderBy: {
            id: "desc",
          },
        },
      },
    });
    res
      .status(200)
      .json({ message: "Verso fetched successfully!", data: verso });
  } catch (error) {
    res.status(500).json({ message: "something went wrong :(" });
    return;
  }
};
export const deleteVerso = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const verso = await prisma.verso.findUnique({
      select: {
        image: true,
        id: true,
      },
      where: {
        id: Number(id),
      },
    });
    if (verso?.image) await deleteFile(verso?.image);
    await prisma.verso.delete({
      where: {
        id: Number(id),
      },
    });
    res
      .status(200)
      .json({ message: "Verso deleted successfully!", data: verso });
  } catch (error) {
    res.status(500).json({ message: "something went wrong :(" });
    return;
  }
};

export const updateVerso = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const payload = versoSchema.parse(body);
    //check if files exist and are valid images
    if (req.files?.image) {
      const image = req.files.image as UploadedFile; //this is either going to be a single file or an array of files.
      //but we already ensure that only single file is getting passed from the frontend.
      const validationMsg = imageValidator(image.size, image.mimetype);
      if (validationMsg) {
        res.status(422).json({
          message: "Image validation failed",
          errors: { image: validationMsg },
        });
        return;
      }

      //get old image public_id
      const verso = await prisma.verso.findUnique({
        select: {
          image: true,
          id: true,
        },
        where: {
          id: Number(id),
        },
      });
      if (verso?.image) await deleteFile(verso?.image);
      payload.image = await uploadFile(image);
    }
    await prisma.verso.update({
      where: {
        id: Number(id),
      },
      data: {
        ...payload,
        expires_at: new Date(payload.expires_at),
      },
    });
    res
      .status(201)
      .json({ message: "Verso updated successfully!", data: payload });
    return;
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error);
      res.status(422).json({
        message: "Validation failed",
        errors: formatError(error),
      });
      return;
    }
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
      error: error,
    });
    return;
  }
};
