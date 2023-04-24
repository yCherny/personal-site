import { Schema, model, models } from 'mongoose';

export interface ISection {
	page: string; // 'about', 'portfolio'
	title: string;
	content: string;
}

export const sectionSchema = new Schema<ISection>({
	page: { type: String, required: true },
	title: { type: String, required: true },
	content: { type: String, required: true },
});

export const Section =
	models.Section || model<ISection>('Section', sectionSchema);

type SectionContent = {
	page: string;
	title: string;
	content: string;
};

export default SectionContent;
