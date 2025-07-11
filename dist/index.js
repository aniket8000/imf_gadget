"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const gadget_routes_1 = __importDefault(require("./routes/gadget.routes"));
const auth_middleware_1 = require("./middleware/auth.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT || 4000;
app.get("/", (req, res) => {
    res.send("IMF Gadget API is running ");
});
// Public
app.use("/api/auth", auth_routes_1.default);
// Protected
app.use("/api/gadgets", auth_middleware_1.authenticate, gadget_routes_1.default);
app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
});
