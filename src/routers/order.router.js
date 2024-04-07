import express from "express"
import OrderController from "../controller/Order/Order.comntroller.js";
import checkAccessToken from "../middleware/checkAccessToken.js";
const router = express.Router();
const order = new OrderController();

router.post('/createOrder',checkAccessToken, order.createOrder)
router.get('/getOrderById',checkAccessToken, order.getOrderByIdUser)
router.get('/getOrderByIdCusTomer',checkAccessToken, order.getOrderByIdCustomer)
router.get('/getOrderBydate',checkAccessToken, order.getProfitFromDay)
router.delete('/deleteOrderbyId',checkAccessToken, order.deleteOrderByid)
router.put('/update',checkAccessToken, order.updateOrder)
router.put('/updateConfirm',checkAccessToken, order.updateOrderPay)
router.get('/export_excel', order.exportOrderByIdAdmin)
export default router
