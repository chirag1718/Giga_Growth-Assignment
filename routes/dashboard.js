import epxress from "express";
const router = epxress.Router();
import { message, stockData } from "../controllers/dashboardController.js";

router.get("/", stockData);
router.post("/message", message);

export default router;
