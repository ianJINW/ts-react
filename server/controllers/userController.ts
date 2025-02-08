import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcryptjs";

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
		res.status(500).json({ error: "Failed to fetch users" });
	}
};

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
		res.status(500).json({ error: "Failed to fetch user" });
	}
};

export const createUser = async (req: Request, res: Response) => {
	const { email, username, password } = req.body;
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
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ error: "Failed to create user" });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { email, username, password } = req.body;
	const hash = await bcrypt.hash(password, 10);
	const image = req.file?.path;

	try {
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
		res.status(500).json({ error: "Failed to update user" });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		await prisma.user.delete({
			where: { id: Number(id) },
		});
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: "Failed to delete user" });
	}
};
