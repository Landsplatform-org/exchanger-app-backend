import type { Request, Response } from "express";

import type { IReview } from "../schemas/review.schema";
import { Review } from "../models/review.model";

const reviews = new Review();

export const getReviews = async (req: Request, res: Response) => {
  const page = req.query.page ? (req.query.page as string) : "0";
  const limit = req.query.limit ? (req.query.limit as string) : "10";

  try {
    const result = await reviews.getAll(limit, page);
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

export const getReviewById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await reviews.getById(id);
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

export const addReview = async (req: Request, res: Response) => {
  const bodyToAdd: IReview = req.body;

  if (!bodyToAdd) return;

  try {
    const result = await reviews.add(bodyToAdd);
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

export const updateReview = async (req: Request, res: Response) => {
  const id = req.params.id;
  const bodyToUpdate: IReview = req.body;

  if (!bodyToUpdate) return;

  try {
    const result = await reviews.update(id, bodyToUpdate);
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

export const deleteReview = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await reviews.delete(id);
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
