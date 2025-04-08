import Image from 'next/image';

const UserCard = ({ type }: { type: string }) => {
    return (
        <div className='rounded-2xl text-text odd:bg-primaryShade even:bg-secondaryShade p-4 flex-1 min-w-[22vmax] md:min-w-[16vmax] w-auto'>
            <div className='flex justify-between items-center gap-4'>
                <span className='text-[1vmax] bg-text px-[0.8vw] py-[0.2vw] rounded-full text-primary opacity-70'>
                    2025/03
                </span>
                <Image src='/more.png' alt='' width={20} height={20} className='w-[1.5vmax] h-[1.5vmax]' />
            </div>
            <h1 className='text-[3vmax] font-bold'>1,234</h1>
            <h2 className='capitalize text-[1.3vmax] font-medium opacity-80'>
                {type}
            </h2>
        </div>
    );
};

export default UserCard;
