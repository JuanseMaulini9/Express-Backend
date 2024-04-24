import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRETTEXT || "MYSECRETKEY";

/**
 *
 * @param {Request} req Original request previous middleware of verification JWT
 * @param {Response} res Response to verification of JWT
 * @param {NextFunction} next Next function to be executed
 * @returns Errors of verification of next execution
 *
 */

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check HEADER from Request for 'x-access-token'
  let token: any = req.headers["x-access-token"];

  // Verify if jwt is present
  if (!token) {
    return res.status(403).send({
      authenticationError: "Missing JWT in request",
      message: "Not authorised to consume this endpoint",
    });
  }

  // verify the token
  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(500).send({
        authenticationError: "JWT verification failed",
        message: "Failed to verify JWT token",
      });
    }
    // Pass something to next request (id of user || other info)

    // Execute next function
    next();
  });
};
