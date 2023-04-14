import Image from 'next/image';
import Header from '../header/header';

type Props = {
  content: string;
};

function Section({ content }: Props) {
  return (
    <div>
      <Header
        title={'About'}
        subtitle={'if gollum found a computer'}
      />
      <p className='text-xl font-medium'>
        {content}
      </p>
    </div>

  )
}

export default Section;