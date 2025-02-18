import React, { useState } from "react";
import { useRegisterMutation } from "../utils/query";

const Register: React.FC = () => {
	// Local state for form fields and image preview
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [profile, setProfileImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	// Destructure mutation properties from your custom hook
	const { mutate, isPending, isError, error } = useRegisterMutation();

	// Handle file input change: read the file and set preview
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setProfileImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	// Handle form submission: build FormData and trigger mutation
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("email", email);
		formData.append("username", username);
		formData.append("password", password);
		if (profile) {
			formData.append("image", profile);
		}
		mutate(formData);
	};

	return (
		<div>
			<h2>Register</h2>
			<form encType="multipart/form-data" onSubmit={handleSubmit}>
				<div>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Username:</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Profile Image:</label>
					<input
						type="file"
						accept="image/*"
						name="profile"
						onChange={handleImageChange}
					/>
				</div>
				{imagePreview && (
					<div>
						<img
							src={imagePreview}
							alt="Profile Preview"
							style={{ width: "100px", height: "100px" }}
						/>
					</div>
				)}
				<button type="submit" disabled={isPending}>
					{isPending ? "Registering..." : "Register"}
				</button>
			</form>
			{isError && <p>{(error as Error)?.message || "Registration failed"}</p>}
		</div>
	);
};

export default Register;
