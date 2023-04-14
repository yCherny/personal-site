import Link from 'next/link';
import Image from 'next/image';
import Tag from '../portfolio/tag';
import Post from '@/interfaces/post';
import DateFormatter from '../layout/date-formatter';

type Props = {
	post: Post;
	expanded?: boolean;
};

function PostCard({ post, expanded = false }: Props) {
	return (
		<div className={expanded ? 'row-span-2' : 'row-span-1'}>
			<Link href={`/blog/${post.slug}`} className='drop-shadow-2xl'>
				<div className='group h-auto max-w-full rounded-xl overflow-hidden transition duration-500 hover:scale-105 bg-white dark:bg-black relative drop-shadow-lg'>
					<div
						className={expanded ? 'h-96' : 'h-48 group-hover:h-96'}
					>
						<Image
							src={post.ogImage.url}
							alt={'Blog post image'}
							width={1920}
							height={1080}
							className='absolute h-full w-full object-cover'
						/>

						<div className='z-50 flex flex-col-reverse items-start p-5 justify-between h-full transition duration-500 group-hover:backdrop-blur-md group-hover:bg-black/40 group-hover:flex-col'>
							<Tag
								text={'Development'}
								color={
									'bg-emerald-500 text-white hidden group-hover:flex'
								}
							/>
							<div className='flex flex-col gap-2'>
								<h2 className='text-sm font-bold text-gray-500 dark:text-gray-500 hidden group-hover:flex'>
									<DateFormatter dateString={post.date} />
								</h2>
								<h1 className='text-4xl font-bold text-white z-50'>
									{post.title}
								</h1>
								<p className='text-gray-400 hidden group-hover:flex'>
									{post.excerpt}
								</p>
								<div className='flex flex-row items-center gap-4 hidden group-hover:flex'>
									<Image
										src={post.author.picture}
										alt={'Author Profile Image'}
										width={40}
										height={40}
										className='rounded-lg'
									/>
									<h4 className='text-md font-bold text-white'>
										{post.author.name}
									</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default PostCard;
