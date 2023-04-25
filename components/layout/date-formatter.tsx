import { parseISO, format } from 'date-fns';

type Props = {
	dateString: Date;
};

const DateFormatter = ({ dateString }: Props) => {
	const date = parseISO(dateString.toString());
	return (
		<time dateTime={dateString.toString()}>
			{format(date, 'LLLL	d, yyyy')}
		</time>
	);
};

export default DateFormatter;
