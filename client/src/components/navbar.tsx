import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
	return (
		<>
			<img src="" alt="" />
			<nav>
				<Link to={"/"}>Home</Link>
				<Link to={"/fyp"}>Posts</Link>
				<Link to={"/account"}>Account</Link>
			</nav>{" "}
		</>
	);
};

export default Navbar;
