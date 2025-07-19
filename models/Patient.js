import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	age: { type: Number, required: true },
	gender: { type: String, enum: ["male", "female", "other"], required: true },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Patient || mongoose.model("Patient", PatientSchema);