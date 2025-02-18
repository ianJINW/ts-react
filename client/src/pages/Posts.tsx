import React from "react";
import { useFetchData } from "../utils/query";

const Posts: React.FC = () => {
	const { data: posts, error, isLoading } = useFetchData("/api/posts");

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	if (!posts || posts.length === 0) {
		return <p>No posts available</p>;
	}

	return (
		<div>
			<h2>Posts</h2>
			<main>
				{posts.map((post: any) => (
					<article key={post.id}>
						<p>{post.post}</p>
						{post.media && post.media.trim() !== "" ? (
							<img src={post.media} alt={post.media} />
						) : null}
					</article>
				))}
			</main>
		</div>
	);
};

export default Posts;
