import Image from 'next/image';

type Props = {
	authorName: string;
	authorPicture: string;
	authorURL?: string;
};

function AuthorTag({
	authorName,
	authorPicture,
	authorURL = undefined,
}: Props) {
	return (
		<div className='flex flex-row items-center gap-4 rounded-full p-1 backdrop-blur-md bg-black/20'>
			<Image
				src={authorPicture}
				alt={'Author Profile Image'}
				width={30}
				height={30}
				className='rounded-full aspect-square'
			/>
		</div>
	);
}

export default AuthorTag;
