import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routers/userRoutes";
import postRouter from "./routers/postRouter";
import commentRouter from "./routers/commentRouter";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
