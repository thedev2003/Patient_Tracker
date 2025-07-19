import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export async function sendSms({ to, message }) {
	if (!to || !message) throw new Error("Missing phone or message");
	try {
		const res = await client.messages.create({
			body: message,
			from: fromNumber,
			to,
		});
		return { success: true, sid: res.sid };
	} catch (e) {
		console.error("Twilio error:", e);
		return { success: false, error: e.message };
	}
}