import { Request, Response } from "express";

import { IParserLog } from "../schemas/parser_logs.schema";
import { ParserLog } from "../models/parser_logs.model";

const parserLogs = new ParserLog();

export const getParserLogs = async (req: Request, res: Response) => {
  const page = req.query.page ? (req.query.page as string) : "0";
  const limit = req.query.limit ? (req.query.limit as string) : "10";

  try {
    const result = await parserLogs.getAll(limit, page);
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

export const getParserLogById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await parserLogs.getById(id);
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

export const addParserLog = async (req: Request, res: Response) => {
  const bodyToAdd: IParserLog = req.body;

  if (!bodyToAdd) return;

  try {
    const result = await parserLogs.add(bodyToAdd);
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

export const updateParserLog = async (req: Request, res: Response) => {
  const id = req.params.id;
  const bodyToUpdate: IParserLog = req.body;

  if (!bodyToUpdate) return;

  try {
    const result = await parserLogs.update(id, bodyToUpdate);
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

export const deleteParserLog = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await parserLogs.delete(id);
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
