import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	phone: { type: String, required: true },
	gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
	birthDate: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Patient || mongoose.model("Patient", PatientSchema);