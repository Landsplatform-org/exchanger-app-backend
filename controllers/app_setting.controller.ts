import type { Request, Response } from "express";

import { AppSetting } from '../models/app_setting.model';
import type { IAppSetting } from "../schemas/app_setting.schema";

const settings = new AppSetting();

export const getAppSettings = async (req: Request, res: Response) => {
  const page = req.query.page ? (req.query.page as string) : "0";
  const limit = req.query.limit ? (req.query.limit as string) : "10";

  try {
    const result = await settings.getAll(limit, page);
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

export const updateAppSetting = async (req: Request, res: Response) => {
  const id = req.params.id;
  const bodyToUpdate: IAppSetting = req.body;

  if (!bodyToUpdate) return;

  try {
    const result = await settings.update(id, bodyToUpdate);
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

export const deleteAppSetting = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await settings.delete(id);
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
