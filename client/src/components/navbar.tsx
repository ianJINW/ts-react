import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../useAuth";
import { useLogoutMutation } from "../utils/query";

const Navbar: React.FC = () => {
	const { user, isDark, dark } = useAuth();
	const logoutMutation = useLogoutMutation();

	const handleLogout = (e: React.FormEvent) => {
		e.preventDefault();
		logoutMutation.mutate();
	};

	return (
		<div className="navbar">
			{user && (
				<img src={user.image} alt={user.username} className="profile-image" />
			)}
			{user && <h3>{user.username}</h3>}
			<button onClick={dark}>{isDark ? "Light Mode" : "Dark Mode"}</button>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/fyp">Posts</Link>
				{user ? (
					<>
						<Link to="/account">Account</Link>
						<form onSubmit={handleLogout}>
							<button type="submit">Log out</button>
						</form>
					</>
				) : (
					<>
						<Link to="/login">Login</Link>
						<Link to="/register">Register</Link>
					</>
				)}
			</nav>
		</div>
	);
};

export default Navbar;
