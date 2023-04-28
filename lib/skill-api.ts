import SkillContent from '@/interfaces/skill';

export async function loadSkillset() {
	const res = await fetch(process.env.API_URL + '/api/skill');
	const data = await res.json();
	const skills: SkillContent[] = data.skills;

	const skillTypes = skills.map((skill) => skill.type).flat();
	const skillFilters = Array.from(new Set(skillTypes));

	return { skills, skillFilters };
}
