// src/routes/gadget.routes.ts

import { Router } from "express";
import * as gadgetController from "../controllers/gadget.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Gadgets
 *   description: Gadget Management Routes
 */

/**
 * @swagger
 * /api/gadgets:
 *   get:
 *     summary: Get all gadgets with random success probability
 *     tags: [Gadgets]
 *     parameters:
 *       - name: status
 *         in: query
 *         description: Filter gadgets by status
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of gadgets
 */
router.get("/", gadgetController.getAllGadgets);

/**
 * @swagger
 * /api/gadgets:
 *   post:
 *     summary: Create a new gadget with random codename
 *     tags: [Gadgets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: EMP Watch
 *     responses:
 *       201:
 *         description: Gadget created successfully
 */
router.post("/", gadgetController.createGadget);

/**
 * @swagger
 * /api/gadgets/{id}:
 *   patch:
 *     summary: Update an existing gadget
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Available, Deployed, Destroyed, Decommissioned]
 *     responses:
 *       200:
 *         description: Gadget updated successfully
 *       404:
 *         description: Gadget not found
 */
router.patch("/:id", gadgetController.updateGadget);

/**
 * @swagger
 * /api/gadgets/{id}:
 *   delete:
 *     summary: Soft delete (decommission) a gadget
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gadget decommissioned successfully
 *       404:
 *         description: Gadget not found
 */
router.delete("/:id", gadgetController.decommissionGadget);

/**
 * @swagger
 * /api/gadgets/{id}/self-destruct:
 *   post:
 *     summary: Simulate self-destruct confirmation code
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Self-destruct confirmation code generated
 */
router.post("/:id/self-destruct", gadgetController.selfDestruct);

export default router;
