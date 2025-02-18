import React from "react";
import Navbar from "./components/navbar";
import { AuthProvider } from "./AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./useAuth";
import "./app.css";

const App: React.FC = () => {
	console.log("API URL:", process.env.REACT_APP_API_URL, process.env.API_URL);
	const { user } = useAuth();

	return (
		<>
			<Router>
				<Navbar />

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/fyp" element={<Posts />} />
					<Route path="/account" element={<Account />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
