import express from "express"
import CartController from "../controller/Cart/cart.controller.js";
import checkAccessToken from "../middleware/checkAccessToken.js";
const router = express.Router();
const cart = new CartController();

router.post('/create',checkAccessToken, cart.createProductToCart)
router.get('/get',checkAccessToken, cart.getCartByIdUser)
router.delete('/delete',checkAccessToken, cart.DeleteProInCart)
export default router