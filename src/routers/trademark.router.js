import express from "express"
import TrademarkeControler from "../controller/Trademark/trademark.controller.js";
import checkAccessToken from '../middleware/checkAccessToken.js'

const router = express.Router();
const trademark = new TrademarkeControler();

router.get('/getAll',checkAccessToken, trademark.getAllTrademarke)
router.post('/create', trademark.createTrademarke)
router.put('/update', trademark.updateTrademarke)
router.delete('/delete', trademark.deleteTrademark)

export default router