import FeedbackPanel from '@/components/feedback/feedback';
import Header from '@/components/header/header';
import Image from 'next/image';
import Markdown from '@/components/sections/markdown';
import Content from '@/interfaces/content';
import DateFormatter from '../layout/date-formatter';
import StickyNavBar from '../layout/sticky-nav-bar';

type Props = {
	type: string;
	data: Content;
};

export default function DetailContent({ type, data }: Props) {
	return (
		<div className='max-w-6xl mx-auto min-h-screen'>
			<StickyNavBar>
				<Header title={type} subheader>
					<FeedbackPanel />
				</Header>
			</StickyNavBar>
			<div className='grid grid-cols-1 mt-16 gap-10'>
				<h2 className='text-lg font-bold text-gray-500 dark:text-gray-500'>
					<DateFormatter dateString={data.startDate} />
				</h2>
				<div className='flex flex-col gap-5'>
					<h1 className='font-bold dark:text-white text-4xl md:text-8xl'>
						{data.title}
					</h1>
					<p className='dark:text-gray-500 text-xl'>{data.excerpt}</p>
				</div>

				<div className='flex items-start justify-between flex-col md:flex-row'>
					<div className='flex flex-col gap-2'>
						{data.authors.length > 1 && (
							<h4 className='dark:text-white text-lg font-bold ml-5'>
								Collaborators
							</h4>
						)}

						<div
							className={`flex flex-row w-full gap-2 rounded-full p-2`}
							style={{ backgroundColor: data.color }}
						>
							{data.authors.map((author, index) => (
								<a href={author.url} key={index}>
									<div className='flex flex-row items-center gap-2 rounded-full pl-2 py-2 pr-4 backdrop-blur-md bg-gray-400/30 dark:bg-black/20'>
										<Image
											src={author.picture}
											alt={'Author Profile Image'}
											width={30}
											height={30}
											className='rounded-full'
										/>
										<h4 className='font-bold dark:text-white text-sm md:text-xl'>
											{author.name}
										</h4>
									</div>
								</a>
							))}
						</div>
					</div>
				</div>
				<div className='relative'>
					<Image
						src={data.coverImage.url}
						alt={'Post image'}
						width={1920}
						height={1080}
						className='rounded-xl aspect-video object-cover'
					/>
					{data.coverImage.copyrightLink && (
						<a href={data.coverImage.copyrightLink}>
							{data.coverImage.copyrightOwner && (
								<h4 className='absolute bottom-0 text-white px-2 py-1 border-2 rounded-lg m-3 opacity-50 hover:opacity-100 hover:scale-105'>
									© {data.coverImage.copyrightOwner}
								</h4>
							)}
						</a>
					)}
				</div>
				<Markdown content={data.content} />
				<div className='mb-28 flex flex-col items-center'>
					<FeedbackPanel />
				</div>
			</div>
		</div>
	);
}
