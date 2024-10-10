import { Response } from "express";

export default function returnResponse(
  res: Response,
  message: string,
  data?: any,
) {
  return res.status(res.statusCode).json({
    status: res.statusCode,
    success: true,
    message: message,
    data: data && data,
  });
}
