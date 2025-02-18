import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routers/userRoutes";
import postRouter from "./routers/postRouter";
import commentRouter from "./routers/commentRouter";
import cookieParser from "cookie-parser";
import "./config/passport";
import passport from "./config/passport";
import { createUser, login } from "./controllers/userController";
import { upload } from "./middleware/multer";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const frontend = process.env.FRONTEND_URL;

app.use(
	cors({
		origin: frontend,
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE"],
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use("/uploads", express.static("uploads"));

app.use("/api", passport.authenticate("jwt", { session: false }));

app.post("/login", login);
app.post("/register", upload.single("profile"), createUser);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT} ${frontend}`);
});
