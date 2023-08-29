import type { Request, Response } from "express";

import { FAQ } from '../models/faq.model';
import type { IFAQ } from "../schemas/faq.schema";

const faqs = new FAQ();

export const getFAQs = async (req: Request, res: Response) => {
  const page = req.query.page ? (req.query.page as string) : "0";
  const limit = req.query.limit ? (req.query.limit as string) : "10";

  try {
    const result = await faqs.getAll(limit, page);
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

export const getFAQById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await faqs.getById(id);
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

export const addFAQ = async (req: Request, res: Response) => {
  const bodyToAdd: IFAQ = req.body;

  if (!bodyToAdd) return;

  try {
    const result = await faqs.add(bodyToAdd);
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
};

export const updateFAQ = async (req: Request, res: Response) => {
  const id = req.params.id;
  const bodyToUpdate: IFAQ = req.body;

  if (!bodyToUpdate) return;

  try {
    const result = await faqs.update(id, bodyToUpdate);
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

export const deleteFAQ = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await faqs.delete(id);
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
