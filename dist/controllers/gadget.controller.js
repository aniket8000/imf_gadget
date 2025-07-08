"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selfDestruct = exports.decommissionGadget = exports.updateGadget = exports.createGadget = exports.getAllGadgets = void 0;
const client_1 = require("@prisma/client");
const gadget_helpers_1 = require("../utils/gadget.helpers");
const prisma = new client_1.PrismaClient();
const getAllGadgets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.query;
        let gadgets = yield prisma.gadget.findMany({
            where: status ? { status: String(status) } : undefined,
        });
        const gadgetsWithSuccess = gadgets.map((gadget) => (Object.assign(Object.assign({}, gadget), { successProbability: (0, gadget_helpers_1.generateSuccessProbability)() })));
        res.status(200).json(gadgetsWithSuccess);
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching gadgets", error: err });
    }
});
exports.getAllGadgets = getAllGadgets;
const createGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const codename = (0, gadget_helpers_1.generateCodename)();
        const newGadget = yield prisma.gadget.create({
            data: {
                name: name || codename,
            },
        });
        res.status(201).json(newGadget);
    }
    catch (err) {
        res.status(500).json({ message: "Error creating gadget", error: err });
    }
});
exports.createGadget = createGadget;
const updateGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, status } = req.body;
    try {
        const updated = yield prisma.gadget.update({
            where: { id },
            data: { name, status },
        });
        res.status(200).json(updated);
    }
    catch (err) {
        res.status(404).json({ message: "Gadget not found", error: err });
    }
});
exports.updateGadget = updateGadget;
const decommissionGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updated = yield prisma.gadget.update({
            where: { id },
            data: {
                status: "Decommissioned",
                decommissionedAt: new Date(),
            },
        });
        res.status(200).json({ message: "Gadget decommissioned", gadget: updated });
    }
    catch (err) {
        res.status(404).json({ message: "Gadget not found", error: err });
    }
});
exports.decommissionGadget = decommissionGadget;
const selfDestruct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Simulate a fake confirmation code
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    res.status(200).json({
        message: `Self-destruct code for gadget ${id}: ${confirmationCode}`,
    });
});
exports.selfDestruct = selfDestruct;
