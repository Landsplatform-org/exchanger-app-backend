import type { Request, Response } from "express";

import type { ITechSupport } from "../schemas/tech_support.schema";
import { TechSupport } from "../models/tech_support.model";

const support = new TechSupport();

export const getTechSupportMessages = async (req: Request, res: Response) => {
  const page = req.query.page ? (req.query.page as string) : "0";
  const limit = req.query.limit ? (req.query.limit as string) : "10";

  try {
    const result = await support.getAllSupportMessages(limit, page);
    return res.status(200).send({
      status: 200,
      data: result,
      message: "Successful",
    });
  } catch (error) {
    return res.status(404).send({
      status: 404,
      message: error,
    });
  }
}

export const getTechSupportMessageById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await support.getSupportMessage(id);
    return res.status(200).send({
      status: 200,
      data: result,
      message: "Successful",
    });
  } catch (error) {
    return res.status(404).send({
      status: 404,
      message: error,
    });
  }
};

export const sendTechSupportMessage = async (req: Request, res: Response) => {
  const bodyToAdd: ITechSupport = req.body;

  if (!bodyToAdd) return;

  try {
    const result = await support.add(bodyToAdd);
    return res.status(201).send({
      status: 201,
      data: result,
      message: "Successful",
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: error,
    });
  }
}

export const deleteTechSupportMessage = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await support.delete(id);
    return res.status(200).send({
      status: 200,
      data: result,
      message: "Successful",
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: error,
    });
  }
};