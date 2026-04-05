import { ZodError } from "zod";
import { opinionSchema } from "../validation/opinionValidation.js";
import { deleteFile, formatError, imageValidator, uploadFile, } from "../helper.js";
import prisma from "../config/database.js";
export const setOpinions = async (req, res) => {
    try {
        const body = req.body;
        const payload = opinionSchema.parse(body);
        let uploadedImage;
        //check if files exist and are valid images
        if (req.files?.image) {
            const image = req.files.image; //this is either going to be a single file or an array of files.
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
        }
        else {
            res.status(422).json({ errors: { image: "Image field is required!" } });
            return;
        }
        await prisma.opinion.create({
            data: {
                ...payload,
                image: uploadedImage,
                user_id: req.user?.id,
                expires_at: new Date(payload.expires_at),
            },
        });
        res.status(201).json({ message: "Opinion created successfully!" });
        return;
    }
    catch (error) {
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
export const getOpinions = async (req, res) => {
    try {
        const opinions = await prisma.opinion.findMany({
            where: {
                user_id: req.user?.id, //auth info is passed on to the request  using authMiddleware..
            },
            orderBy: {
                id: "desc",
            },
        });
        res
            .status(200)
            .json({ message: "Opinions fetched successfully!", data: opinions });
    }
    catch (error) {
        res.status(500).json({ message: "something went wrong :(" });
        return;
    }
};
export const getOpinion = async (req, res) => {
    try {
        const { id } = req.params;
        const opinion = await prisma.opinion.findUnique({
            //we can select specific fields to show, instead of the entire json like only id and desc using select key
            where: {
                id: Number(id),
            },
            include: {
                opinionItems: {
                    orderBy: {
                        id: "desc",
                    },
                    select: {
                        image: true,
                        id: true,
                        count: true,
                    },
                },
                opinionComments: {
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
            .json({ message: "Opinion fetched successfully!", data: opinion });
    }
    catch (error) {
        res.status(500).json({ message: "something went wrong :(" });
        return;
    }
};
export const deleteOpinion = async (req, res) => {
    try {
        const { id } = req.params;
        const opinion = await prisma.opinion.findUnique({
            select: {
                image: true,
                id: true,
            },
            where: {
                id: Number(id),
            },
        });
        if (opinion?.image)
            await deleteFile(opinion?.image);
        await prisma.opinion.delete({
            where: {
                id: Number(id),
            },
        });
        res
            .status(200)
            .json({ message: "Opinion deleted successfully!", data: opinion });
    }
    catch (error) {
        res.status(500).json({ message: "something went wrong :(" });
        return;
    }
};
export const updateOpinion = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const payload = opinionSchema.parse(body);
        //check if files exist and are valid images
        if (req.files?.image) {
            const image = req.files.image; //this is either going to be a single file or an array of files.
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
            const opinion = await prisma.opinion.findUnique({
                select: {
                    image: true,
                    id: true,
                },
                where: {
                    id: Number(id),
                },
            });
            if (opinion?.image)
                await deleteFile(opinion?.image);
            payload.image = await uploadFile(image);
        }
        await prisma.opinion.update({
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
            .json({ message: "Opinion updated successfully!", data: payload });
        return;
    }
    catch (error) {
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
