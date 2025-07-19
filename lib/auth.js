import bcrypt from "bcryptjs";
import User from "@/models/User";
import { dbConnect } from "@/lib/db";
import ps from "zod/v4/locales/ps.cjs";

/**
 * Register a new user.
 */
export async function registerUser({ name, email, password, role }) {
	await dbConnect();
	return User.create({ name, email, passwordHash : password, role });
}

/**
 * Authenticate user by email and password.
 */
export async function authenticateUser(email, password) {
	await dbConnect();
	const user = await User.findOne({ email });
	if (!user) return null;
	const isMatch = await bcrypt.compare(password, user.passwordHash);
	if (!isMatch) return null;
	return user;
}