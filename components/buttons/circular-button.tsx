interface ButtonProps {
	icon: React.ReactNode;
	onClick: any;
	selected?: boolean;
	color?: string;
}

function CircularButton({ icon, onClick, selected = false }: ButtonProps) {
	function buttonClicked() {
		onClick();
	}

	return (
		<button
			className={
				`rounded-full w-11 p-2.5 
			
			backdrop-blur-md transition duration-500 text-white
			
			bg-black/10 text-black 
			hover:bg-black hover:text-white 
			
			dark:bg-black/10  dark:hover:bg-white dark:hover:text-black
			` + (selected && 'bg-black/100 text-white dark:bg-white dark:text-black')
			}
			onClick={buttonClicked}
		>
			{icon}
		</button>
	);
}

export default CircularButton;
