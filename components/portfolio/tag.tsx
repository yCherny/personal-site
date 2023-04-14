type Props = {
	text: string;
	color: string;
};

function Tag({ text, color }: Props) {
	return (
		<h4
			className={`rounded-full px-3 py-1 font-medium text-white`}
			style={{ backgroundColor: color }}
		>
			{text}
		</h4>
	);
}

export default Tag;
