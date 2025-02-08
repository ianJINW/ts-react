import React from "react";
import { useFetchData } from "../utils/query";

const Posts: React.FC = () => {
	const {
		data: posts,
		error,
		isLoading,
	} = useFetchData(`${process.env.API_URL}/posts`);

	console.log(posts);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<div>
			<h2>Posts</h2>

			<main>
				{posts &&
					posts.map((post: any) => (
						<article key={post.id}>
							<p>{post.post}</p>
							{post.image && post.image.trim() !== "" && (
								<img src={post.image} alt={post.post} />
							)}
						</article>
					))}
			</main>
		</div>
	);
};

export default Posts;
