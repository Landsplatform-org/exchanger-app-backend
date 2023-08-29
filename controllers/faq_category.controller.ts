import type { Request, Response } from "express";

import { FAQCategory } from '../models/faq_category.model';
import type { IFAQCategory } from "../schemas/faq_category.schema";

const faqCategories = new FAQCategory();

export const getFAQCategories = async (req: Request, res: Response) => {
  const page = req.query.page ? (req.query.page as string) : "0";
  const limit = req.query.limit ? (req.query.limit as string) : "10";

  try {
    const result = await faqCategories.getAll(limit, page);
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

export const getFAQCategoryById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await faqCategories.getById(id);
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

export const addFAQCategory = async (req: Request, res: Response) => {
  const bodyToAdd: IFAQCategory = req.body;

  if (!bodyToAdd) return;

  try {
    const result = await faqCategories.add(bodyToAdd);
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

export const updateFAQCategory = async (req: Request, res: Response) => {
  const id = req.params.id;
  const bodyToUpdate: IFAQCategory = req.body;

  if (!bodyToUpdate) return;

  try {
    const result = await faqCategories.update(id, bodyToUpdate);
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

export const deleteFAQCategory = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await faqCategories.delete(id);
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
