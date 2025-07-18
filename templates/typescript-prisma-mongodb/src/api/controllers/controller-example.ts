import { Request, Response } from "express";

export const exampleFunction = async (req: Request, res: Response) => {
  res.status(200).json("Hellow world");
};
