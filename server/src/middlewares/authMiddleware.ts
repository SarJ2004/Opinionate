// we are using this middleware for security check to check whether the token that we have passed is valid or not

//if it is a valid token, we will forward the request further, else we will stop it.

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // the client will make a request with the Authorization header like: Authorization: "Bearer token"
  const authHeader = req.headers.authorization;
  if (authHeader === null || authHeader === undefined) {
    res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
    return;
  }
  const token = authHeader.split(" ")[1]; //getting the jwt from the Authorization header
  // Verify token
  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    //this callback provides two parameters: one is the err msg, and the other one is the decrypted token details
    if (err) {
      res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
      return;
    }
    req.user = user as AuthUser; //attach user to the request.
    next();
  });
};

export default authMiddleware;
