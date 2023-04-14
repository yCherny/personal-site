import markdownStyles from './markdown-styles.module.css';
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
				children={content}
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeHighlight]}
				className='prose lg:prose-xl dark:prose-invert'
			/>
		</div>
	);
}

export default Markdown;
