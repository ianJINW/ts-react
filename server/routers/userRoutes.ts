import express from "express";
import {
	getUsers,
	createUser,
	updateUser,
	deleteUser,
	getUserById,
	logout,
} from "../controllers/userController";
import { upload } from "../middleware/multer";

const router = express.Router();

router.get("/", getUsers);
router.post("/", upload.single("profile"), createUser);
router.put("/:id", upload.single("profile"), updateUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.route("logout").get(logout);

export default router;
