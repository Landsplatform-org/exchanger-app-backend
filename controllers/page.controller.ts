import type { Request, Response } from "express";

import type { IPage } from "../schemas/page.schema";
import { Page } from "../models/page.model";

const pages = new Page();

export const getPages = async (req: Request, res: Response) => {
  const page = req.query.page ? (req.query.page as string) : "0";
  const limit = req.query.limit ? (req.query.limit as string) : "10";

  try {
    const result = await pages.getAll(limit, page);
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

export const getPageById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await pages.getById(id);
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

export const addPage = async (req: Request, res: Response) => {
  const bodyToAdd: IPage = req.body;

  if (!bodyToAdd) return;

  try {
    const result = await pages.add(bodyToAdd);
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

export const updatePage = async (req: Request, res: Response) => {
  const id = req.params.id;
  const bodyToUpdate: IPage = req.body;

  if (!bodyToUpdate) return;

  try {
    const result = await pages.update(id, bodyToUpdate);
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

export const deletePage = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await pages.delete(id);
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
    const result = await pages.setPhoto(id, file);
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
