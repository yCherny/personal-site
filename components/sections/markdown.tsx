import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

type Props = {
	content: string;
};

function Markdown({ content }: Props) {
	return (
		<div className='mx-auto'>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeHighlight]}
				className='prose lg:prose-xl dark:prose-invert'
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}

export default Markdown;
