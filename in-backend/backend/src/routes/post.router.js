import {Router} from 'express';
import { createpost,getPosts,updatePost,deletePost } from '../controller/post.controller.js';
const router=Router();
router.route("/create").post(createpost);
router.route("/getPosts").get(getPosts);
router.route("/update/:id").patch(updatePost);
router.route("/delete/:id").get(deletePost);
export default router;