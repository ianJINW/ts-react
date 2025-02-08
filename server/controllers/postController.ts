import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createPost = async (req: Request, res: Response) => {
	let { post, authorId } = req.body;
	authorId = Number(authorId);
	const media = req.file?.path;

	try {
		const newPost = await prisma.posts.create({
			data: {
				post,
				media,
				authorId,
			},
		});
		res.status(201).json(newPost);
	} catch (error: any) {
		res.status(500).json({ error: `Failed to create post ${error}` });
	}
};

export const getPosts = async (req: Request, res: Response) => {
	try {
		const posts = await prisma.posts.findMany({
			include: {
				author: true,
				comments: true,
			},
		});
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch posts" });
	}
};

export const getPostById = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const post = await prisma.posts.findUnique({
			where: { id: Number(id) },
			include: {
				author: true,
				comments: true,
			},
		});

		if (!post) {
			res.status(404).json({ error: "Post not found" });
			return;
		}

		res.status(200).json(post);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch post" });
	}
};

export const updatePost = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { post } = req.body;
	const media = req.file?.path;

	try {
		const updatedPost = await prisma.posts.update({
			where: { id: Number(id) },
			data: {
				post,
				media,
			},
		});

		res.status(200).json(updatedPost);
	} catch (error) {
		res.status(500).json({ error: "Failed to update post" });
	}
};

export const deletePost = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await prisma.posts.delete({
			where: { id: Number(id) },
		});

		res.status(204).send();
	} catch (error) {
		res.status(500).json({ error: "Failed to delete post" });
	}
};
