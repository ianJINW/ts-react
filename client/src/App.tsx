import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Account from "./pages/Account";

const App: React.FC = () => {
	return (
		<main>
			<h2>React app</h2>

			<Router>
				<Navbar />

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/fyp" element={<Posts />} />
					<Route path="/account" element={<Account />} />
				</Routes>
			</Router>
		</main>
	);
};

export default App;
