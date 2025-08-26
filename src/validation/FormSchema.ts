import * as yup from "yup";

export const LoginSchema = yup.object({
	identifier: yup
		.string()
		.email("Invalid email address")
		.matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address")
		.required("Email is required"),
	password: yup
		.string()
		.min(6, "Password must be at least 6 characters")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
			"Password must contain uppercase, lowercase letter, and numbers",
		)
		.required("Password is required"),
});

export const SignupSchema = yup.object({
	username: yup
		.string()
		.min(4, "Username must be at least 4 characters")
		.max(20, "Username must be at most 20 characters")
		.required("Username is required"),
	email: yup
		.string()
		.email("Invalid email address")
		.matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address")
		.required("Email is required"),
	password: yup
		.string()
		.min(6, "Password must be at least 6 characters")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
			"Password must contain uppercase, lowercase letter, and numbers",
		)
		.required("Password is required"),
});

export const ProductSchema = yup.object({
	title: yup.string().required("Title is required"),
	description: yup.string().required("Description is required"),
	thumbnail: yup.string().required("Thumbnail is required"),
	price: yup
		.number()
		.min(0, "Price must be positive")
		.required("Price is required"),
	stock: yup
		.number()
		.min(0, "Stock must be positive")
		.required("Stock is required"),
	category: yup.string().required("Category is required"),
});
