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

export const addProductSchema = yup.object({
	title: yup.string().required("Title is required"),
	description: yup.string().required("Description is required"),
	thumbnail: yup
		.mixed<File>()
		.required("Thumbnail is required")
		.test("file", "Invalid file type", (value) => {
			if (!value) return true;
			if (value instanceof File) {
				return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
			}
			return false;
		}),
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

export const editProductSchema = yup.object({
	title: yup.string().required("Title is required"),
	description: yup.string().required("Description is required"),
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

export const LocationSchema = yup.object({
	country: yup.string().required("Country is required"),
	street_address: yup.string().required("Street address is required"),
	city: yup.string().required("City is required"),
	state: yup.string().required("State is required"),
	postal_code: yup.string().required("ZIP/Postal code is required"),
});

export const PaymentSchema = yup.object({
	card_name: yup.string().required("Cardholder name is required"),
	card_number: yup
		.string()
		.matches(/^[0-9]{16}$/, "Card number must be 16 digits")
		.required("Card number is required"),
	expiration_date: yup
		.string()
		.matches(
			/^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
			"Expiration date must be in MM/YY format",
		)
		.required("Expiration date is required"),
	cvv: yup
		.string()
		.matches(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits")
		.required("CVV is required"),
	payment_method: yup.string().required("Payment method is required"),
});

export const EmailSchema = yup.object({
	email: yup
		.string()
		.email("Invalid email address")
		.matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address")
		.required("Email is required"),
});

export const ConfirmPasswordSchema = yup.object({
	newPassword: yup
		.string()
		.min(6, "Password must be at least 6 characters")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
			"Password must contain uppercase, lowercase letter, and numbers",
		)
		.required("Password is required"),
	confirmNewPassword: yup
		.string()
		.oneOf([yup.ref("newPassword")], "Passwords must match")
		.required("Confirm Password is required"),
});
