import { Response } from "express";

export default function returnError(res: Response, error: any) {
  console.error("ERROR: " + error.message);
  return res.status(error.status).json({
    status: error.status,
    success: false,
    message: error.message,
    error: error,
  });
}
