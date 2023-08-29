import { Request, Response } from "express";

import { Gateway } from "../models/gateway.model";
import { IGateway } from "../schemas/gateway.schema";

const gateways = new Gateway();

export const getGateways = async (req: Request, res: Response) => {
  const page = req.query.page ? (req.query.page as string) : "0";
  const limit = req.query.limit ? (req.query.limit as string) : "10";

  try {
    const result = await gateways.getAll(limit, page);
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

export const getGatewayById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await gateways.getById(id);
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

export const addGateway = async (req: Request, res: Response) => {
  const bodyToAdd: IGateway = req.body

  if (!bodyToAdd) return;

  try {
    const result = await gateways.add(bodyToAdd);
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

export const updateGateway = async (req: Request, res: Response) => {
  const id = req.params.id;
  const bodyToUpdate: IGateway = req.body;

  if (!bodyToUpdate) return;

  try {
    const result = await gateways.update(id, bodyToUpdate);
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

export const deleteGateway = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await gateways.delete(id);
    return res.status(200).send({
      status: 200,
      data: result,
      message: "Successful"
    });
  } catch (error) {
    return res.status(400).send({
      status: 400,
      message: error
    })
  }
};
