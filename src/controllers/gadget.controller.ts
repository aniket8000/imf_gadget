
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generateCodename, generateSuccessProbability } from "../utils/gadget.helpers";

const prisma = new PrismaClient();

export const getAllGadgets = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.query;
    let gadgets = await prisma.gadget.findMany({
      where: status ? { status: String(status) } : undefined,
    });

    const gadgetsWithSuccess = gadgets.map((gadget) => ({
      ...gadget,
      successProbability: generateSuccessProbability(),
    }));

    res.status(200).json(gadgetsWithSuccess);
  } catch (err) {
    res.status(500).json({ message: "Error fetching gadgets", error: err });
  }
};

export const createGadget = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  try {
    const codename = generateCodename();

    const newGadget = await prisma.gadget.create({
      data: {
        name: name || codename,
      },
    });

    res.status(201).json(newGadget);
  } catch (err) {
    res.status(500).json({ message: "Error creating gadget", error: err });
  }
};

export const updateGadget = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, status } = req.body;

  try {
    const updated = await prisma.gadget.update({
      where: { id },
      data: { name, status },
    });

    res.status(200).json(updated);
  } catch (err) {
    res.status(404).json({ message: "Gadget not found", error: err });
  }
};

export const decommissionGadget = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const updated = await prisma.gadget.update({
      where: { id },
      data: {
        status: "Decommissioned",
        decommissionedAt: new Date(),
      },
    });

    res.status(200).json({ message: "Gadget decommissioned", gadget: updated });
  } catch (err) {
    res.status(404).json({ message: "Gadget not found", error: err });
  }
};

export const selfDestruct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Simulate a fake confirmation code
  const confirmationCode = Math.floor(100000 + Math.random() * 900000);

  res.status(200).json({
    message: `Self-destruct code for gadget ${id}: ${confirmationCode}`,
  });
};
