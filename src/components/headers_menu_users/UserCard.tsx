'use client';
import Image from 'next/image';
import withIconDecorator from '../decorators/IconDecorator';
import * as Icons from '../icons';
export const Options = withIconDecorator(Icons.DotsThree);
const today = new Date();
const formattedDate = today.toLocaleDateString('sv-SE', {
  year: 'numeric',
  month: '2-digit',
});
const finalDate = formattedDate.replace('-', '/');

const UserCard = ({ type, count }: { type: string; count: number }) => {
  return (
    <div className='rounded-2xl text-text odd:bg-primaryShade even:bg-secondaryShade p-4 flex-1 min-w-[22vmax] md:min-w-[16vmax] w-auto'>
      <div className='flex justify-between items-center gap-4'>
        <span className='text-[1vmax] bg-text px-[0.8vw] py-[0.2vw] rounded-full text-primary opacity-70'>
          {finalDate}
        </span>
        <Options
          fillColor='var(--text-color)'
          strokeColor='var(--text-color)'
          strokeWidth={2.5}
          width={'3vmax'}
          height={'3vmax'}
        />
      </div>
      <h1 className='text-[3vmax] font-bold'>{count}</h1>
      <h2 className='capitalize text-[1.3vmax] font-medium opacity-80'>{type}</h2>
    </div>
  );
};

export default UserCard;
