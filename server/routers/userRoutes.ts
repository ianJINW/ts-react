import express from "express";
import {
	getUsers,
	createUser,
	updateUser,
	deleteUser,
	getUserById,
} from "../controllers/userController";
import { upload } from "../middleware/multer";

const router = express.Router();

router.get("/:id", getUserById);
router.get("/", getUsers);
router.post("/", upload.single("profile"), createUser);
router.put("/:id", upload.single("profile"), updateUser);
router.delete("/:id", deleteUser);

export default router;
