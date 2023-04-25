import { Schema, model, models } from 'mongoose';

export interface IContact {
	type: string;
	name: string;
	contactInfo: string;
	message: string;
}

export const contactSchema = new Schema<IContact>({
	type: { type: String, required: true },
	name: { type: String, required: false },
	contactInfo: { type: String, required: false },
	message: { type: String, required: true },
});

export const Contact =
	models.Contact || model<IContact>('Contact', contactSchema);

type ContactContent = {
	type: string;
	name: string;
	contactInfo: string;
	message: string;
};

export default ContactContent;
