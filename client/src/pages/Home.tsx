import React from "react";
import { useAuth } from "../useAuth";

const Home: React.FC = () => {
	const { user } = useAuth();
	interface UserProfile {
		username: string;
	}

	return (
		<>
			<img src={user?.image} alt={user?.username} />

			<main>
				<p>Hello </p>
			</main>
		</>
	);
};

export default Home;
