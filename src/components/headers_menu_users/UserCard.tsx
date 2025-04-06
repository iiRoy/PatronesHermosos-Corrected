import Image from 'next/image';

const UserCard = ({ type }: { type: string }) => {
    return (
        <div className='rounded-2xl text-text odd:bg-primaryShade even:bg-secondaryShade p-4 flex-1 min-w-[18.3vmax]'>
            <div className='flex justify-between items-center'>
                <span className='text-[10px] bg-text px-2 py-1 rounded-full text-primary opacity-70'>
                    2025/03
                </span>
                <Image src='/more.png' alt='' width={20} height={20} />
            </div>
            <h1 className='text-3xl font-bold mt-3 mb-1'>1,234</h1>
            <h2 className='capitalize text-xs font-medium opacity-80'>
                {type}
            </h2>
        </div>
    );
};

export default UserCard;
