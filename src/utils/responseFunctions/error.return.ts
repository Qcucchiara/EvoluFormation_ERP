import { Response } from "express";

export default function returnError(res: Response, error: any, content?: any) {
  console.error("ERROR: " + error.message);
  return res.status(error.status).json({
    status: error.status,
    success: false,
    message: error.message || "Unexpected error",
    error: content && content,
  });
}
