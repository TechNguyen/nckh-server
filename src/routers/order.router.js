import express from "express"
import OrderController from "../controller/Order/Order.comntroller.js";
import checkAccessToken from "../middleware/checkAccessToken.js";
const router = express.Router();
const order = new OrderController();

router.post('/createOrder',checkAccessToken, order.createOrder)
router.get('/getOrderById',checkAccessToken, order.getOrderByIdUser)
router.delete('/deleteOrderbyId',checkAccessToken, order.deleteOrderByid)
router.put('/update',checkAccessToken, order.updateOrder)
export default router