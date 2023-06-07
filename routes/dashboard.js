import epxress from "express";
const router = epxress.Router();
import { stockData } from "../controllers/stockController.js";

router.get("/", stockData);

export default router;
