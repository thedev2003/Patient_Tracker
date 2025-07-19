import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
	title: { type: String, required: true },
	message: { type: String, required: true },
	read: { type: Boolean, default: false },
	patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: false },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);