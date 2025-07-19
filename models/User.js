import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	passwordHash: { type: String, required: true },
	role: { type: String, enum: ["admin", "staff"], default: "staff" },
	createdAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (next) {
	if (!this.isModified("passwordHash")) return next();
	if (!this.passwordHash) return next();
	const hash = await bcrypt.hash(this.passwordHash, 10);
	this.passwordHash = hash;
	next();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);