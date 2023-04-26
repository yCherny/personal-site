import SkillContent from '@/interfaces/skill';

export async function loadSkillset() {
	const res = await fetch('http://192.168.1.169:3000/api/skill');
	const data = await res.json();
	const skills: SkillContent[] = data.skills;

	const skillTypes = skills.map((skill) => skill.type).flat();
	const skillFilters = Array.from(new Set(skillTypes));

	return { skills, skillFilters };
}
