import { Schema, model, models } from 'mongoose';

export interface ISkill {
	type: string; // 'language', 'framework', 'database'
	name: string;
	icon: string;
	value: number;
}

export const skillSchema = new Schema<ISkill>({
	type: { type: String, required: true },
	name: { type: String, required: true },
	icon: { type: String, required: true },
	value: { type: Number, required: true },
});

export const Skill = models.Skill || model<ISkill>('Skill', skillSchema);

type SkillContent = {
	type: string;
	name: string;
	icon: string;
	value: number;
};

export default SkillContent;
