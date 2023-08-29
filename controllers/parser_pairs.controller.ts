import { Request, Response } from "express";

import { IParserPair } from "../schemas/parser_pairs.schema";
import { ParserPair } from "../models/parser_pairs.model";

const parserPairs = new ParserPair();

export const getParserPairs = async (req: Request, res: Response) => {
  const page = req.query.page ? (req.query.page as string) : "0";
  const limit = req.query.limit ? (req.query.limit as string) : "10";

  try {
    const result = await parserPairs.getAll(limit, page);
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

export const getParserPairsBySourceId = async (req: Request, res: Response) => {
  const sourceId = req.params.sourceId;

  try {
    const result = await parserPairs.getAllBySourceId(sourceId);
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

export const addParserPair = async (req: Request, res: Response) => {
  const bodyToAdd: IParserPair = req.body;

  if (!bodyToAdd) return;

  try {
    const result = await parserPairs.add(bodyToAdd);
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

export const updateParserPair = async (req: Request, res: Response) => {
  const id = req.params.id;
  const bodyToUpdate: IParserPair = req.body;

  if (!bodyToUpdate) return;

  try {
    const result = await parserPairs.update(id, bodyToUpdate);
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

export const deleteParserPair = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await parserPairs.delete(id);
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
