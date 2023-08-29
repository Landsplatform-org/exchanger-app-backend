import type { Request, Response } from "express";

import type { INews } from "../schemas/news.schema";
import { News } from '../models/news.model';

const news = new News();

export const getNews = async (req: Request, res: Response) => {
  const page = req.query.page ? (req.query.page as string) : "0";
  const limit = req.query.limit ? (req.query.limit as string) : "10";

  try {
    const result = await news.getAll(limit, page);
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

export const getNewsById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await news.getById(id);
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

export const addNews = async (req: Request, res: Response) => {
  const bodyToAdd: INews = req.body;

  if (!bodyToAdd) return;

  try {
    const result = await news.add(bodyToAdd);
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

export const updateNews = async (req: Request, res: Response) => {
  const id = req.params.id;
  const bodyToUpdate: INews = req.body;

  if (!bodyToUpdate) return;

  try {
    const result = await news.update(id, bodyToUpdate);
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

export const deleteNews = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await news.delete(id);
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

export const setPhoto = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!req.file)
    return res.status(404).send({
      status: 404,
      message: "File was not found",
    });

  const file = req.file.filename;

  try {
    const result = await news.setPhoto(id, file);
    res.status(200).send({
      status: 200,
      message: result,
    });
  } catch (error) {
    res.status(400).send({
      status: 400,
      message: error,
    });
  }
};
