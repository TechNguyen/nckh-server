import express from "express"
import CommentController from "../controller/Comment/Comment.Controller.js";
const router = express.Router();
const comment = new CommentController();
import checkAccessToken from "../middleware/checkAccessToken.js";

router.get('/get',checkAccessToken, comment.getCommentByIdProduct)
router.post('/create',checkAccessToken, comment.CreateComment)
router.put('/update',checkAccessToken, comment.UpdateComment)
router.delete('/delete',checkAccessToken, comment.DeleteComment)
export default router