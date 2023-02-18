import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { StringRegexOptions } from "joi";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: StringRegexOptions;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT Token is missing.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);
    // Dub Id do usuário
    const { sub } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token.');
  }
}
