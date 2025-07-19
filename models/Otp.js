import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
	phone: { type: String, required: true },
	code: { type: String, required: true },
	expiresAt: { type: Date, required: true },
	verified: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Otp || mongoose.model("Otp", OtpSchema);