import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Fetch all users
export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany({
			include: {
				posts: true,
				comments: true,
			},
		});
		res.status(200).json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ error: "Failed to fetch users" });
	}
};

// Fetch a user by ID
export const getUserById = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const user = await prisma.user.findUnique({
			where: { id: Number(id) },
			include: {
				posts: true,
				comments: true,
			},
		});
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json({ error: "User not found" });
		}
	} catch (error) {
		console.error("Error fetching user:", error);
		res.status(500).json({ error: "Failed to fetch user" });
	}
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
	const { email, username, password } = req.body;
	console.log(req.body);
	const image = req.file?.path;

	try {
		const hash = await bcrypt.hash(password, 10);
		const newUser = await prisma.user.create({
			data: {
				email,
				username,
				password: hash,
				image,
			},
		});
		res.status(201).json({ message: "User successfully created" });
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ error: "Failed to create user" });
	}
};

// Update an existing user
export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { email, username, password } = req.body;
	const image = req.file?.path;

	try {
		const hash = await bcrypt.hash(password, 10);
		const updatedUser = await prisma.user.update({
			where: { id: Number(id) },
			data: {
				email,
				username,
				password: hash,
				image,
			},
		});
		res.status(200).json(updatedUser);
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).json({ error: "Failed to update user" });
	}
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		await prisma.user.delete({
			where: { id: Number(id) },
		});
		res.status(204).send();
	} catch (error) {
		console.error("Error deleting user:", error);
		res.status(500).json({ error: "Failed to delete user" });
	}
};

// User login
export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			res.status(404).json({ error: "User not found" });
			return;
		}

		const match = await bcrypt.compare(password, user.password);

		if (!match) {
			res.status(401).json({ error: "Invalid credentials" });
			return;
		}

		const payload = { id: user.id, email: user.email, image: user.image };
		const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
			expiresIn: "1h",
		});

		res.cookie("auth_token", token, {
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 1000 * 10,
		});
		res.json({ message: "Logged in successfully", user: payload });
	} catch (error) {
		console.error("Error during login:", error);
		res.status(500).json({ error: "Failed to login" });
	}
};

// User logout
export const logout = async (req: Request, res: Response) => {
	res.clearCookie("auth_token");
	res.json({ message: "Logged out successfully" });
};
