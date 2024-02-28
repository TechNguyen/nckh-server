import express from "express"
import TrademarkeControler from "../controller/Trademark/trademark.controller.js";

const router = express.Router();
const trademark = new TrademarkeControler();

router.get('/getAll', trademark.getAllTrademarke)
router.post('/create', trademark.createTrademarke)

export default router